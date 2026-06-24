/* Work — full projects page. Featured card spans wide, rest in a 2-col grid.
   Composes Card / Tag / SpecList / SectionLabel. Reads window.PROJECTS. */
const { Card, Tag, SpecList, SectionLabel, Button } = window.MauriceDPpenDesignSystem_3628c1;

function ProjectCard({ p, featured }) {
  return (
    <Card variant={featured ? 'raised' : 'plain'} interactive cornerTicks index={p.n}
      style={{ display: 'flex', flexDirection: 'column', gap: 16, gridColumn: featured ? '1 / -1' : 'auto' }}>
      <div className={featured ? 'feat-card-inner' : ''} style={{ display: featured ? 'grid' : 'block', gridTemplateColumns: featured ? '1.4fr 1fr' : '1fr', gap: 40 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
            {p.tagline}
          </div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: featured ? 52 : 30, letterSpacing: '-0.03em', margin: '0 0 14px', color: 'var(--ink-0)' }}>
            {p.title}
          </h3>
          <p style={{ margin: 0, fontSize: featured ? 17 : 15, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '52ch' }}>
            {p.blurb}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 22 }}>
            {p.tags.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
          </div>
        </div>
        {featured && (
          <div style={{ borderLeft: '1px solid var(--line-0)', paddingLeft: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
            <SpecList items={p.specs} />
            <Button variant="solid" mono iconRight={<i data-lucide="arrow-up-right" style={{ width: 16, height: 16 }}></i>} style={{ alignSelf: 'flex-start' }}>
              Case study
            </Button>
          </div>
        )}
      </div>
      {!featured && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 'auto', borderTop: '1px solid var(--line-0)' }}>
          <SpecList items={p.specs} dense style={{ flexDirection: 'row', gap: 18, flex: 'unset' }} />
          <i data-lucide="arrow-up-right" style={{ width: 18, height: 18, color: 'var(--ink-1)' }}></i>
        </div>
      )}
    </Card>
  );
}

function Work() {
  const projects = window.PROJECTS;
  return (
    <section id="work" className="section">
      <SectionLabel index="01" accent>Selected work</SectionLabel>
      <p style={{ maxWidth: '54ch', margin: '32px 0 64px', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-1)' }}>
        Systems I designed, shipped, and kept alive in production. Each one traded
        a sharp constraint for a measurable result.
      </p>
      <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {projects.map((p) => <ProjectCard key={p.n} p={p} featured={p.featured} />)}
      </div>
    </section>
  );
}

Object.assign(window, { Work, ProjectCard });
