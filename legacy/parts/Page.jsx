/* Page — per-page mount + router. Reads body[data-page], renders the right
   sections, plus the shared Tweaks panel. Tweaks persist across pages via
   localStorage so the look stays consistent while navigating. */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroDirection": "poster",
  "density": "maximal",
  "accent": "#F24E16",
  "texture": "on"
}/*EDITMODE-END*/;

const TWK_STORE = 'mdTweaks';
function loadTweaks() {
  try { return { ...TWEAK_DEFAULTS, ...JSON.parse(localStorage.getItem(TWK_STORE) || '{}') }; }
  catch (e) { return { ...TWEAK_DEFAULTS }; }
}

function Page() {
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor } = window;
  const page = document.body.dataset.page || 'home';
  const [t, setTweak] = useTweaks(loadTweaks());

  React.useEffect(() => {
    try { localStorage.setItem(TWK_STORE, JSON.stringify({ heroDirection: t.heroDirection, density: t.density, accent: t.accent, texture: t.texture })); } catch (e) {}
    document.body.setAttribute('data-density', t.density);
    document.body.setAttribute('data-texture', t.texture);
    const root = document.documentElement;
    if (t.accent === '#F24E16') {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-strong');
    } else {
      root.style.setProperty('--accent', t.accent);
      root.style.setProperty('--accent-strong', t.accent);
    }
  }, [t.density, t.texture, t.accent, t.heroDirection]);

  React.useEffect(() => {
    const id = setTimeout(() => window.lucide && window.lucide.createIcons(), 40);
    return () => clearTimeout(id);
  }, [t.heroDirection, t.density, t.texture, page]);

  let content;
  if (page === 'home') {
    content = (
      <React.Fragment>
        <window.Hero direction={t.heroDirection} />
        <window.WorkTeaser />
        <window.WritingTeaser />
        <window.ContactCta />
      </React.Fragment>
    );
  } else if (page === 'work') {
    content = <window.Work />;
  } else if (page === 'writing') {
    content = <window.Writing />;
  } else if (page === 'experience') {
    content = <window.Experience />;
  } else if (page === 'about') {
    content = <window.About />;
  } else if (page === 'contact') {
    content = <window.Contact />;
  }

  return (
    <React.Fragment>
      <window.Nav page={page} />
      <main className="screen">{content}</main>
      <window.Footer />

      <TweaksPanel>
        {page === 'home' && <TweakSection label="Hero" />}
        {page === 'home' && (
          <TweakRadio label="Layout" value={t.heroDirection}
            options={[
              { value: 'poster', label: 'Poster' },
              { value: 'split', label: 'Split' },
              { value: 'statement', label: 'Statement' },
            ]}
            onChange={(v) => setTweak('heroDirection', v)} />
        )}
        <TweakSection label="Layout" />
        <TweakRadio label="Whitespace" value={t.density}
          options={[
            { value: 'maximal', label: 'Maximal' },
            { value: 'generous', label: 'Generous' },
          ]}
          onChange={(v) => setTweak('density', v)} />
        <TweakRadio label="Blueprint texture" value={t.texture}
          options={[
            { value: 'on', label: 'On' },
            { value: 'off', label: 'Off' },
          ]}
          onChange={(v) => setTweak('texture', v)} />
        <TweakSection label="Color" />
        <TweakColor label="Accent" value={t.accent}
          options={['#F24E16', '#1F6FEB', '#1F8A5B', '#17150F']}
          onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

function mountPage() {
  const ready = window.useTweaks && window.TweaksPanel && window.Nav && window.Hero &&
    window.Work && window.Writing && window.Experience && window.About && window.Contact &&
    window.Footer && window.WorkTeaser && window.WritingTeaser && window.ContactCta &&
    window.MauriceDPpenDesignSystem_3628c1;
  if (!ready) { setTimeout(mountPage, 30); return; }
  ReactDOM.createRoot(document.getElementById('app')).render(<Page />);
}
mountPage();
