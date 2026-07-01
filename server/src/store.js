/* Append-only JSONL backup of accepted messages. This is the safety net if
   email delivery ever fails silently. Best-effort: a store error must never
   break a submission that was already emailed.

   Retention: records older than config.retentionDays are pruned (DSGVO storage
   limitation) at startup and opportunistically as new ones arrive. */
import { appendFile, mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { config } from './config.js';

let dirReady = false;

async function ensureDir() {
  if (dirReady) return;
  await mkdir(dirname(config.storeFile), { recursive: true });
  dirReady = true;
}

export async function storeMessage(record) {
  if (!config.storeFile) return;
  try {
    await ensureDir();
    await appendFile(config.storeFile, JSON.stringify(record) + '\n', 'utf8');
  } catch (err) {
    console.error('[store] failed to persist message:', err.message);
  }
}

// Rewrites the store keeping only records newer than the retention window.
// Returns the number of records removed (best-effort; logs and swallows errors).
export async function pruneStore() {
  if (!config.storeFile || !config.retentionDays) return 0;
  try {
    let raw;
    try {
      raw = await readFile(config.storeFile, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') return 0; // nothing stored yet
      throw err;
    }
    const cutoff = Date.now() - config.retentionDays * 86400_000;
    const lines = raw.split('\n').filter(Boolean);
    const kept = lines.filter((line) => {
      try {
        const t = Date.parse(JSON.parse(line).receivedAt);
        return Number.isFinite(t) ? t >= cutoff : true; // keep unparseable rather than lose data
      } catch {
        return true;
      }
    });
    const removed = lines.length - kept.length;
    if (removed > 0) {
      // Atomic replace: write a temp file then rename over the original.
      const tmp = join(dirname(config.storeFile), `.messages.${process.pid}.tmp`);
      await writeFile(tmp, kept.length ? kept.join('\n') + '\n' : '', 'utf8');
      await rename(tmp, config.storeFile);
      console.log(`[store] pruned ${removed} record(s) older than ${config.retentionDays}d`);
    }
    return removed;
  } catch (err) {
    console.error('[store] prune failed:', err.message);
    return 0;
  }
}
