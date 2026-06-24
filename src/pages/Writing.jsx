/* /writing — article ledger. Custom masthead, a mono topic filter rail, and a
   ruled list of long-form notes. */
import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { SectionLabel, Tag } from '../ds/index.js';
import { ARTICLES } from '../data.js';

export default function Writing() {
  const topics = useMemo(() => ['All', ...new Set(ARTICLES.flatMap((a) => a.tags))], []);
  const [topic, setTopic] = useState('All');
  const shown = topic === 'All' ? ARTICLES : ARTICLES.filter((a) => a.tags.includes(topic));

  return (
    <>
      <PageHeader
        index="02" path="/writing" title="Field " accentWord="notes."
        lead="Long-form notes on building and breaking systems. No fluff, no thought-leadership — just what actually shipped and what it cost."
        meta={[['Entries', String(ARTICLES.length).padStart(2, '0')], ['Cadence', 'Monthly-ish'], ['Topic', topic]]}
      />

      <section className="shell section">
        {/* topic filter rail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginBottom: 8 }}>
          <SectionLabel index="·" rule={false}>Filter</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {topics.map((t) => (
              <button key={t} onClick={() => setTopic(t)} style={{
                appearance: 'none', cursor: 'pointer', padding: '6px 12px',
                fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em',
                borderRadius: 'var(--radius-pill)',
                border: `1px solid ${topic === t ? 'var(--accent)' : 'var(--line-1)'}`,
                background: topic === t ? 'var(--accent)' : 'transparent',
                color: topic === t ? 'var(--text-on-accent)' : 'var(--ink-1)',
                transition: 'var(--transition-control)',
              }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1.5px solid var(--ink-0)', marginTop: 28 }}>
          {shown.map((a) => (
            <a key={a.n} href="#" className="article-row" style={{
              display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 'clamp(20px, 4vw, 56px)',
              alignItems: 'baseline', padding: 'clamp(28px, 4vh, 48px) 8px',
              borderBottom: '1px solid var(--line-0)', color: 'inherit',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', letterSpacing: '0.04em', paddingTop: 6 }}>{a.n}</span>
              <div>
                <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 14 }}>
                  <span>{a.date}</span><span>·</span><span>{a.read}</span>
                </div>
                <h3 className="article-title" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 38px)', letterSpacing: '-0.025em', marginBottom: 14, color: 'var(--ink-0)', maxWidth: '24ch' }}>
                  {a.title}
                </h3>
                <p style={{ marginBottom: 18, fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '64ch' }}>{a.blurb}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {a.tags.map((t) => <Tag key={t} variant="outline" size="sm">{t}</Tag>)}
                </div>
              </div>
              <ArrowUpRight size={22} style={{ color: 'var(--ink-1)', alignSelf: 'center' }} />
            </a>
          ))}
          {shown.length === 0 && (
            <p style={{ padding: '48px 8px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-3)' }}>
              No entries tagged “{topic}” yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
