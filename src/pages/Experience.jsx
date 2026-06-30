/* /experience — vertical timeline. Custom masthead, then the hairline-spine
   timeline with accent nodes. Orgs with more than one role stack those roles on
   a nested sub-spine, LinkedIn-style. */
import PageHeader from '../components/PageHeader.jsx';
import { Tag, Badge } from '../ds/index.js';
import { TIMELINE } from '../data.js';

/* Shared inner content for a single role — blurb + tag row. */
function RoleBody({ blurb, tags }) {
  return (
    <>
      <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-1)', maxWidth: '56ch' }}>
        {blurb}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 14 }}>
        {tags.map((t) => <Tag key={t} variant="outline" size="sm">{t}</Tag>)}
      </div>
    </>
  );
}

export default function Experience() {
  return (
    <>
      <PageHeader
        index="03" path="/experience" title="Timeline" accentWord="."
        lead="Full-stack software engineer based in Bern, working with Java, Quarkus, Angular, and much more. I like to support and mentor people, as a certified Berufsbildner and as a Sergeant."
        meta={[['Span', '2021 – Now'], ['Base', 'Bern, CH'], ['Mode', 'Hybrid · On-site']]}
      />

      <section className="shell section bp-dots" style={{ paddingTop: 'clamp(48px, 7vh, 88px)' }}>
        <div style={{ position: 'relative' }}>
          {TIMELINE.map((e, i) => {
            const last = i === TIMELINE.length - 1;
            const multi = e.roles.length > 1;
            const span = e.now ? `${e.year} – Now` : e.end ? `${e.year} – ${e.end}` : e.year;
            const headerBits = [e.loc, span, e.mode, `${e.roles.length} roles`].filter(Boolean);
            return (
              <div key={e.org} className="tl-row" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 36, position: 'relative' }}>
                {/* Left rail — headline year + optional end + Now badge */}
                <div style={{ textAlign: 'right', paddingTop: 2 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 24, letterSpacing: '0.02em', color: e.now ? 'var(--accent)' : 'var(--ink-0)' }}>
                    {e.year}
                  </div>
                  {e.end && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--ink-3)', marginTop: 2 }}>
                      – {e.end}
                    </div>
                  )}
                  {e.now && <div style={{ marginTop: 8, display: 'inline-block' }}><Badge tone="accent">Now</Badge></div>}
                </div>

                {/* Right — spine, company node, content */}
                <div style={{ position: 'relative', paddingLeft: 36, paddingBottom: last ? 0 : 80 }}>
                  <span style={{ position: 'absolute', left: 0, top: i === 0 ? 13 : 0, bottom: 0, width: 1.5, background: 'var(--line-1)' }} />
                  <span style={{ position: 'absolute', left: -5.5, top: 13, width: 13, height: 13, borderRadius: '50%', background: e.now ? 'var(--accent)' : 'var(--surface-page)', border: `1.5px solid ${e.now ? 'var(--accent)' : 'var(--ink-0)'}` }} />

                  {multi ? (
                    <>
                      {/* Company header */}
                      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 27, letterSpacing: '-0.02em', color: 'var(--ink-0)' }}>
                        {e.org}
                      </h3>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--ink-2)', marginTop: 8, textTransform: 'uppercase' }}>
                        {headerBits.join(' · ')}
                      </div>

                      {/* Nested role sub-spine */}
                      <div style={{ position: 'relative', marginTop: 22 }}>
                        <span style={{ position: 'absolute', left: 0, top: 13, bottom: 10, width: 1, background: 'var(--line-0)' }} />
                        {e.roles.map((r, ri) => {
                          const ongoing = /Now$/.test(r.period);
                          return (
                          <div key={r.role} style={{ position: 'relative', paddingLeft: 26, paddingBottom: ri === e.roles.length - 1 ? 0 : 28 }}>
                            <span style={{ position: 'absolute', left: -4, top: 9, width: 9, height: 9, borderRadius: '50%', background: ongoing ? 'var(--accent)' : 'var(--surface-page)', border: `1.5px solid ${ongoing ? 'var(--accent)' : 'var(--ink-2)'}` }} />
                            <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em', color: 'var(--ink-0)', margin: 0 }}>
                              {r.role}
                            </h4>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--ink-3)', marginTop: 5, textTransform: 'uppercase' }}>
                              {r.period}
                            </div>
                            <RoleBody blurb={r.blurb} tags={r.tags} />
                          </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 27, letterSpacing: '-0.02em', color: 'var(--ink-0)' }}>
                        {e.roles[0].role}
                      </h3>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--ink-2)', marginTop: 8, textTransform: 'uppercase' }}>
                        {e.org} · {e.loc}
                      </div>
                      <RoleBody blurb={e.roles[0].blurb} tags={e.roles[0].tags} />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
