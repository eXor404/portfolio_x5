/* Hero — home poster. Stacked grotesque name, mono meta rail, tagline, CTAs,
   and the stack row. */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROFILE } from '../data.js';
import { Button, Tag } from '../ds/index.js';

export default function Hero() {
  return (
    <section id="top" className="bp-grid" style={{ borderBottom: '1.5px solid var(--ink-0)' }}>
      <div className="shell" style={{ paddingTop: 'clamp(40px, 6vh, 84px)', paddingBottom: 'clamp(80px, 12vh, 160px)' }}>
        {/* meta rail */}
        <div className="reveal" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-2)',
        }}>
          <span>Portfolio / 2026</span>
          <span className="hide-sm">{PROFILE.coords}</span>
          <span>{PROFILE.location}</span>
        </div>

        <div style={{ marginTop: 'clamp(43px, 8vh, 88px)' }}>
          <div className="reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)', letterSpacing: '0.06em', marginBottom: 26, animationDelay: '60ms' }}>
            {PROFILE.role}
          </div>
          <h1 className="reveal" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(64px, 13vw, 188px)',
            lineHeight: 0.9, letterSpacing: '-0.045em', color: 'var(--ink-0)', animationDelay: '120ms',
          }}>
            Maurice<br />Däppen<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>

          <div className="reveal" style={{ maxWidth: 1100, marginTop: 'clamp(40px, 6vh, 72px)', animationDelay: '200ms' }}>
            <div className="hero-lower" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'end' }}>
              <div>
                <p style={{ maxWidth: '42ch', marginBottom: 36, fontSize: 19, lineHeight: 1.6, color: 'var(--ink-1)' }}>
                  {PROFILE.tagline}
                </p>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <Link to="/work">
                    <Button variant="accent" size="lg" iconRight={<ArrowRight size={18} />}>View selected work</Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg" mono>Get in touch</Button>
                  </Link>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 14 }}>
                  Stack
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {PROFILE.stack.map((t) => (
                    <Link key={t} to="/about#stack" className="stack-chip" aria-label={`${t} — view full stack`}>
                      <Tag size="sm" style={{ cursor: 'pointer' }}>{t}</Tag>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
