/* ProjectCard — featured variant spans wide with a spec rail + case-study
   button; compact variant is a 2-col grid cell with a spec footer. */
import { ArrowUpRight } from 'lucide-react';
import { Card, Tag, SpecList, Button } from '../ds/index.js';

export default function ProjectCard({ p, featured = false }) {
  return (
    <Card variant={featured ? 'raised' : 'plain'} interactive cornerTicks index={p.n}
      style={{ display: 'flex', flexDirection: 'column', gap: 16, gridColumn: featured ? '1 / -1' : 'auto' }}>
      <div className={featured ? 'feat-card-inner' : ''} style={{ display: featured ? 'grid' : 'block', gridTemplateColumns: featured ? '1.4fr 1fr' : '1fr', gap: 40 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
            {p.tagline}
          </div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: featured ? 52 : 30, letterSpacing: '-0.03em', marginBottom: 14, color: 'var(--ink-0)' }}>
            {p.title}
          </h3>
          <p style={{ fontSize: featured ? 17 : 15, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '52ch' }}>
            {p.blurb}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 22 }}>
            {p.tags.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
          </div>
        </div>
        {featured && (
          <div style={{ borderLeft: '1px solid var(--line-0)', paddingLeft: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
            <SpecList items={p.specs} />
            <Button variant="solid" mono iconRight={<ArrowUpRight size={16} />} style={{ alignSelf: 'flex-start' }}>
              Case study
            </Button>
          </div>
        )}
      </div>
      {!featured && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 'auto', borderTop: '1px solid var(--line-0)' }}>
          <SpecList items={p.specs} dense style={{ flexDirection: 'row', gap: 18, flex: 'unset' }} />
          <ArrowUpRight size={18} style={{ color: 'var(--ink-1)' }} />
        </div>
      )}
    </Card>
  );
}
