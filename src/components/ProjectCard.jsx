/* ProjectCard — a project as a bordered grid cell: tagline kicker, title,
   blurb, tag row, and a spec footer (LOC · year) closed by a corner arrow. */
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Card, Tag, SpecList, Eyebrow } from '../ds/index.js';

export default function ProjectCard({ p }) {
  return (
    <Card as={Link} to={`/work/${p.slug}`} variant="plain" interactive cornerTicks index={p.n}
      style={{ display: 'flex', flexDirection: 'column', gap: 16, textDecoration: 'none', color: 'inherit' }}>
      <div>
        <Eyebrow tone="accent" style={{ marginBottom: 10 }}>{p.tagline}</Eyebrow>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 30, letterSpacing: '-0.03em', marginBottom: 14, color: 'var(--ink-0)' }}>
          {p.title}
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '52ch' }}>
          {p.blurb}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 22 }}>
          {p.tags.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 'auto', borderTop: '1px solid var(--line-0)' }}>
        <SpecList items={p.specs} dense style={{ flexDirection: 'row', gap: 18, flex: 'unset' }} />
        <ArrowUpRight size={18} style={{ color: 'var(--ink-1)' }} />
      </div>
    </Card>
  );
}
