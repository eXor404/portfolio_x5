/* @ds-bundle: {"format":3,"namespace":"MauriceDPpenDesignSystem_3628c1","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"TextArea","sourcePath":"components/forms/TextArea.jsx"},{"name":"Annotation","sourcePath":"components/layout/Annotation.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"SectionLabel","sourcePath":"components/layout/SectionLabel.jsx"},{"name":"SpecList","sourcePath":"components/layout/SpecList.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"89cf8fd9300a","components/core/Button.jsx":"496a2f28a738","components/core/IconButton.jsx":"1e53599cf58a","components/core/Tag.jsx":"c9b3a3c2d9bd","components/forms/Input.jsx":"84a1fe1f55f9","components/forms/TextArea.jsx":"3ea6451dcb13","components/layout/Annotation.jsx":"0409fa1797f5","components/layout/Card.jsx":"29d704778286","components/layout/SectionLabel.jsx":"840ffbe1421b","components/layout/SpecList.jsx":"79c8db45d2db","ui_kits/portfolio/About.jsx":"1fa6bba1a86e","ui_kits/portfolio/Contact.jsx":"8358e88688d3","ui_kits/portfolio/Experience.jsx":"5f5825333e9e","ui_kits/portfolio/Footer.jsx":"3d7bdad86dcf","ui_kits/portfolio/Landing.jsx":"3ed77184a459","ui_kits/portfolio/Nav.jsx":"075343adc1e4","ui_kits/portfolio/Projects.jsx":"0e2891a0fb15"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MauriceDPpenDesignSystem_3628c1 = window.MauriceDPpenDesignSystem_3628c1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status indicator (online/secure/CI states). Mono,
 * uppercase, semantic-colored.
 */
function Badge({
  children,
  tone = 'neutral',
  // neutral | ok | warn | danger | info | accent
  solid = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      soft: 'var(--paper-2)',
      ink: 'var(--ink-1)',
      solid: 'var(--ink-0)'
    },
    ok: {
      soft: 'var(--ok-soft)',
      ink: 'var(--ok)',
      solid: 'var(--ok)'
    },
    warn: {
      soft: 'var(--warn-soft)',
      ink: 'var(--warn)',
      solid: 'var(--warn)'
    },
    danger: {
      soft: 'var(--danger-soft)',
      ink: 'var(--danger)',
      solid: 'var(--danger)'
    },
    info: {
      soft: 'var(--info-soft)',
      ink: 'var(--info)',
      solid: 'var(--info)'
    },
    accent: {
      soft: 'var(--accent-soft)',
      ink: 'var(--accent-ink)',
      solid: 'var(--accent)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 8px',
      fontFamily: 'var(--font-mono)',
      fontSize: '10.5px',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: solid ? 'var(--paper-1)' : tones.ink,
      background: solid ? tones.solid : tones.soft,
      borderRadius: 'var(--radius-sm)',
      lineHeight: 1.3,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Swiss/engineering action control. Square corners, grotesque
 * medium label, optional hard-offset shadow on hover. Variants map to
 * the ink/accent/paper system.
 */
function Button({
  children,
  variant = 'solid',
  // solid | accent | outline | ghost
  size = 'md',
  // sm | md | lg
  mono = false,
  // mono uppercase label (technical voice)
  full = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const sizes = {
    sm: {
      padding: '6px 12px',
      fontSize: 'var(--text-xs)',
      gap: 6
    },
    md: {
      padding: '9px 18px',
      fontSize: 'var(--text-sm)',
      gap: 8
    },
    lg: {
      padding: '14px 26px',
      fontSize: 'var(--text-md)',
      gap: 10
    }
  }[size];
  const palettes = {
    solid: {
      bg: 'var(--ink-0)',
      fg: 'var(--paper-1)',
      border: 'var(--ink-0)',
      hoverBg: 'var(--ink-1)'
    },
    accent: {
      bg: 'var(--accent)',
      fg: 'var(--text-on-accent)',
      border: 'var(--accent)',
      hoverBg: 'var(--accent-strong)'
    },
    outline: {
      bg: 'transparent',
      fg: 'var(--ink-0)',
      border: 'var(--ink-0)',
      hoverBg: 'var(--ink-0)',
      hoverFg: 'var(--paper-1)'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--ink-1)',
      border: 'transparent',
      hoverBg: 'var(--paper-2)'
    }
  }[variant];
  const base = {
    display: full ? 'flex' : 'inline-flex',
    width: full ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes.gap,
    padding: sizes.padding,
    fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
    fontSize: sizes.fontSize,
    fontWeight: mono ? 'var(--weight-medium)' : 'var(--weight-medium)',
    letterSpacing: mono ? 'var(--tracking-wide)' : 'var(--tracking-normal)',
    textTransform: mono ? 'uppercase' : 'none',
    lineHeight: 1,
    color: hover && palettes.hoverFg ? palettes.hoverFg : palettes.fg,
    background: hover && !disabled ? palettes.hoverBg : palettes.bg,
    border: `1.5px solid ${palettes.border}`,
    borderRadius: 'var(--radius-control)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transform: press && !disabled ? 'translate(1px, 1px)' : 'translate(0,0)',
    transition: 'var(--transition-control)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square icon-only control. Pass a Lucide (or any) icon as
 * children. Matches Button's interaction model.
 */
function IconButton({
  children,
  variant = 'outline',
  // solid | accent | outline | ghost
  size = 'md',
  // sm | md | lg
  label,
  // aria-label (required for a11y)
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const dim = {
    sm: 32,
    md: 40,
    lg: 52
  }[size];
  const palettes = {
    solid: {
      bg: 'var(--ink-0)',
      fg: 'var(--paper-1)',
      border: 'var(--ink-0)',
      hoverBg: 'var(--ink-1)'
    },
    accent: {
      bg: 'var(--accent)',
      fg: 'var(--text-on-accent)',
      border: 'var(--accent)',
      hoverBg: 'var(--accent-strong)'
    },
    outline: {
      bg: 'transparent',
      fg: 'var(--ink-0)',
      border: 'var(--ink-0)',
      hoverBg: 'var(--ink-0)',
      hoverFg: 'var(--paper-1)'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--ink-1)',
      border: 'transparent',
      hoverBg: 'var(--paper-2)'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      padding: 0,
      color: hover && palettes.hoverFg ? palettes.hoverFg : palettes.fg,
      background: hover && !disabled ? palettes.hoverBg : palettes.bg,
      border: `1.5px solid ${palettes.border}`,
      borderRadius: 'var(--radius-control)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: press && !disabled ? 'translate(1px,1px)' : 'translate(0,0)',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — mono pill chip for tech stack / metadata (e.g. "Kubernetes",
 * "Rust", "OWASP"). The workhorse label of an engineering portfolio.
 */
function Tag({
  children,
  variant = 'default',
  // default | accent | outline | ink
  size = 'md',
  // sm | md
  dot = false,
  // leading accent dot
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '2px 8px',
      fontSize: '11px'
    },
    md: {
      padding: '4px 10px',
      fontSize: 'var(--text-xs)'
    }
  }[size];
  const palettes = {
    default: {
      bg: 'var(--paper-2)',
      fg: 'var(--ink-1)',
      border: 'transparent'
    },
    accent: {
      bg: 'var(--accent-soft)',
      fg: 'var(--accent-ink)',
      border: 'transparent'
    },
    outline: {
      bg: 'transparent',
      fg: 'var(--ink-1)',
      border: 'var(--line-1)'
    },
    ink: {
      bg: 'var(--ink-0)',
      fg: 'var(--paper-1)',
      border: 'transparent'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: sizes.padding,
      fontFamily: 'var(--font-mono)',
      fontSize: sizes.fontSize,
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-mono)',
      color: palettes.fg,
      background: palettes.bg,
      border: `1px solid ${palettes.border}`,
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'var(--accent)',
      flex: '0 0 auto'
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field with a mono label and underline-forward Swiss
 * styling. Hairline box that goes accent on focus.
 */
function Input({
  label,
  hint,
  error,
  prefix = null,
  // leading icon/text
  mono = false,
  // mono input text (for code/keys)
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--line-1)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-2)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--surface-card)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-control)',
      padding: '0 12px',
      transition: 'border-color var(--dur-fast) var(--ease-out)'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-3)',
      display: 'inline-flex'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: '10px 0',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--ink-0)'
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      color: error ? 'var(--danger)' : 'var(--ink-3)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextArea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TextArea — multiline field matching Input's styling. Used for the
 * contact message box.
 */
function TextArea({
  label,
  hint,
  error,
  rows = 5,
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (label ? `ta-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--line-1)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-2)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      resize: 'vertical',
      background: 'var(--surface-card)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-control)',
      padding: '12px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--ink-0)',
      outline: 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out)'
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      color: error ? 'var(--danger)' : 'var(--ink-3)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { TextArea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextArea.jsx", error: String((e && e.message) || e) }); }

// components/layout/Annotation.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Annotation — the brand's signature "blueprint callout". Wraps content
 * in a dashed rectangle with a small mono label tab, like an engineer's
 * margin note. Use to highlight, mark up, or call attention.
 */
function Annotation({
  children,
  label,
  // mono tab text, e.g. "FIG.01" / "note"
  corner = 'tl',
  // tl | tr | bl | br — where the label sits
  tone = 'ink',
  // ink | accent
  dashed = true,
  style = {},
  ...rest
}) {
  const color = tone === 'accent' ? 'var(--accent)' : 'var(--ink-2)';
  const labelBg = tone === 'accent' ? 'var(--accent)' : 'var(--ink-0)';
  const pos = {
    tl: {
      top: -9,
      left: 'var(--space-3)'
    },
    tr: {
      top: -9,
      right: 'var(--space-3)'
    },
    bl: {
      bottom: -9,
      left: 'var(--space-3)'
    },
    br: {
      bottom: -9,
      right: 'var(--space-3)'
    }
  }[corner];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      border: `1.5px ${dashed ? 'dashed' : 'solid'} ${color}`,
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-5)',
      ...style
    }
  }, rest), label != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      ...pos,
      padding: '2px 7px',
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: tone === 'accent' ? 'var(--text-on-accent)' : 'var(--paper-1)',
      background: labelBg,
      lineHeight: 1.4,
      whiteSpace: 'nowrap'
    }
  }, label), children);
}
Object.assign(__ds_scope, { Annotation });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Annotation.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the system's surface primitive. Square corners defined by a
 * hairline border (not shadow). Optional hard-offset "printed" shadow,
 * blueprint corner ticks, and an index label. Composes anything.
 */
function Card({
  children,
  variant = 'plain',
  // plain | raised | sunken | accent | ink
  interactive = false,
  // hover lift (hard shadow + nudge)
  cornerTicks = false,
  // blueprint crop-mark corners
  index,
  // e.g. "01" — mono index in top-right
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const palettes = {
    plain: {
      bg: 'var(--surface-card)',
      fg: 'var(--ink-0)',
      border: 'var(--line-0)'
    },
    raised: {
      bg: 'var(--surface-card)',
      fg: 'var(--ink-0)',
      border: 'var(--ink-0)'
    },
    sunken: {
      bg: 'var(--surface-sunken)',
      fg: 'var(--ink-0)',
      border: 'var(--line-0)'
    },
    accent: {
      bg: 'var(--accent-tint)',
      fg: 'var(--ink-0)',
      border: 'var(--accent)'
    },
    ink: {
      bg: 'var(--ink-0)',
      fg: 'var(--paper-1)',
      border: 'var(--ink-0)'
    }
  }[variant];
  const lifted = interactive && hover;
  const tickColor = variant === 'ink' ? 'var(--paper-1)' : 'var(--ink-0)';
  const Tick = ({
    pos
  }) => {
    const m = -1,
      len = 9;
    const base = {
      position: 'absolute',
      width: len,
      height: len,
      pointerEvents: 'none'
    };
    const map = {
      tl: {
        top: m,
        left: m,
        borderTop: `1.5px solid ${tickColor}`,
        borderLeft: `1.5px solid ${tickColor}`
      },
      tr: {
        top: m,
        right: m,
        borderTop: `1.5px solid ${tickColor}`,
        borderRight: `1.5px solid ${tickColor}`
      },
      bl: {
        bottom: m,
        left: m,
        borderBottom: `1.5px solid ${tickColor}`,
        borderLeft: `1.5px solid ${tickColor}`
      },
      br: {
        bottom: m,
        right: m,
        borderBottom: `1.5px solid ${tickColor}`,
        borderRight: `1.5px solid ${tickColor}`
      }
    };
    return /*#__PURE__*/React.createElement("span", {
      style: {
        ...base,
        ...map[pos]
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      background: palettes.bg,
      color: palettes.fg,
      border: `1.5px solid ${palettes.border}`,
      borderRadius: 'var(--radius-card)',
      padding: 'var(--space-6)',
      boxShadow: lifted ? 'var(--shadow-hard)' : interactive ? 'var(--shadow-hard-sm)' : 'none',
      transform: lifted ? 'translate(-2px,-2px)' : 'translate(0,0)',
      transition: 'box-shadow var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), cornerTicks && ['tl', 'tr', 'bl', 'br'].map(p => /*#__PURE__*/React.createElement(Tick, {
    key: p,
    pos: p
  })), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 'var(--space-4)',
      right: 'var(--space-4)',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-label)',
      color: variant === 'ink' ? 'var(--ink-3)' : 'var(--ink-3)'
    }
  }, index), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionLabel — the recurring Swiss section header: a mono index +
 * uppercase label, with an optional rule line that fills remaining
 * width. Used to open every page section.
 */
function SectionLabel({
  index,
  // "01"
  children,
  // "Selected work"
  rule = true,
  // trailing hairline rule
  align = 'left',
  // left | right
  accent = false,
  // accent-colored index
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      flexDirection: align === 'right' ? 'row-reverse' : 'row',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 'var(--space-3)',
      flex: '0 0 auto'
    }
  }, index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-label)',
      color: accent ? 'var(--accent)' : 'var(--ink-3)'
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-1)'
    }
  }, children)), rule && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--line-1)'
    }
  }));
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/layout/SpecList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SpecList — mono key/value rows with dotted leaders, like an engineering
 * spec sheet. Great for project metadata, role/stack/year breakdowns.
 */
function SpecList({
  items = [],
  // [{ key, value }]
  dense = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("dl", _extends({
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: dense ? 4 : 10,
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      flex: '0 0 auto'
    }
  }, it.key), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      alignSelf: 'flex-end',
      borderBottom: '1px dotted var(--line-1)',
      transform: 'translateY(-3px)'
    }
  }), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--ink-0)',
      flex: '0 0 auto',
      textAlign: 'right'
    }
  }, it.value))));
}
Object.assign(__ds_scope, { SpecList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SpecList.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/About.jsx
try { (() => {
/* About — portrait placeholder + bio + skills matrix + spec list.
   Composes Card / Tag / SpecList / SectionLabel / Annotation. */
const {
  Card,
  Tag,
  SpecList,
  SectionLabel,
  Annotation
} = window.MauriceDPpenDesignSystem_3628c1;
const SKILLS = {
  'Backend': ['Go', 'Rust', 'Node', 'Postgres', 'gRPC'],
  'Infra / DevOps': ['Kubernetes', 'Terraform', 'Nix', 'ArgoCD', 'AWS'],
  'Security': ['Threat modeling', 'mTLS', 'OPA', 'OWASP', 'eBPF'],
  'Frontend': ['TypeScript', 'React', 'Vite']
};
function About() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '104px 64px 120px'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "03",
    accent: true
  }, "About"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: 72,
      marginTop: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-grid",
    style: {
      position: 'relative',
      aspectRatio: '4 / 5',
      border: '1.5px solid var(--ink-0)',
      background: 'var(--paper-2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, "Portrait"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: 10,
      left: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--ink-3)',
      letterSpacing: '0.08em'
    }
  }, "IMG / 0.8MP")), /*#__PURE__*/React.createElement(Card, {
    variant: "ink",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SpecList, {
    items: [{
      key: 'Based',
      value: 'Bern, CH'
    }, {
      key: 'Exp',
      value: '7 yrs'
    }, {
      key: 'Langs',
      value: 'DE · EN · FR'
    }, {
      key: 'Status',
      value: 'Open Q3'
    }],
    dense: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 22,
      lineHeight: 1.45,
      letterSpacing: '-0.01em',
      color: 'var(--ink-0)',
      maxWidth: '40ch',
      fontWeight: 500
    }
  }, "I'm a fullstack and DevOps engineer who treats security as a design constraint, not an afterthought."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 0',
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--ink-2)',
      maxWidth: '58ch'
    }
  }, "Seven years spanning incident response, platform engineering, and product. I like the seam where reliability meets adversarial thinking \u2014 the questions that start with \"what happens when this fails, and who's trying to make it fail?\""), /*#__PURE__*/React.createElement(Annotation, {
    label: "Stack matrix",
    tone: "accent",
    corner: "tl",
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24
    }
  }, Object.entries(SKILLS).map(([group, items]) => /*#__PURE__*/React.createElement("div", {
    key: group
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 10
    }
  }, group), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 7
    }
  }, items.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    size: "sm"
  }, t))))))))));
}
Object.assign(window, {
  About
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Contact.jsx
try { (() => {
/* Contact — split layout: big invite + mono channels left, form right.
   Interactive submit → success state. Composes Input / TextArea / Button. */
const {
  Input,
  TextArea,
  Button,
  SectionLabel,
  Badge
} = window.MauriceDPpenDesignSystem_3628c1;
function Contact() {
  const [sent, setSent] = React.useState(false);
  const channels = [{
    icon: 'mail',
    label: 'maurice@daeppen.dev'
  }, {
    icon: 'github',
    label: 'github.com/mdaeppen'
  }, {
    icon: 'linkedin',
    label: 'in/maurice-daeppen'
  }, {
    icon: 'key-round',
    label: 'PGP · 0xA1F4 9C22'
  }];
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement("section", {
    className: "bp-grid",
    style: {
      padding: '104px 64px 120px'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "04",
    accent: true
  }, "Contact"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      marginTop: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'clamp(40px,5vw,68px)',
      lineHeight: 0.98,
      letterSpacing: '-0.035em',
      margin: 0,
      color: 'var(--ink-0)'
    }
  }, "Let's build", /*#__PURE__*/React.createElement("br", null), "something", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "solid.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "ok",
    solid: true
  }, "Available Q3 2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--ink-2)'
    }
  }, "Replies < 48h")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      borderTop: '1.5px solid var(--ink-0)'
    }
  }, channels.map(c => /*#__PURE__*/React.createElement("a", {
    key: c.label,
    href: "#",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '15px 4px',
      borderBottom: '1px solid var(--line-0)',
      color: 'var(--ink-1)',
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      letterSpacing: '0.02em'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": c.icon,
    style: {
      width: 17,
      height: 17,
      color: 'var(--accent)'
    }
  }), c.label, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-up-right",
    style: {
      width: 15,
      height: 15,
      marginLeft: 'auto',
      color: 'var(--ink-3)'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1.5px solid var(--ink-0)',
      background: 'var(--surface-card)',
      padding: 28,
      boxShadow: 'var(--shadow-hard)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px 8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-circle-2",
    style: {
      width: 40,
      height: 40,
      color: 'var(--ok)'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: '-0.02em',
      margin: '16px 0 8px'
    }
  }, "Message sent"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--ink-2)',
      fontSize: 14
    }
  }, "I'll get back to you within 48 hours."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    mono: true,
    style: {
      marginTop: 24
    },
    onClick: () => setSent(false)
  }, "Send another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Ada Lovelace",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@domain.com",
    required: true
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Subject",
    placeholder: "Platform engineering role"
  }), /*#__PURE__*/React.createElement(TextArea, {
    label: "Message",
    rows: 5,
    placeholder: "What are you building, and where do I fit?",
    required: true
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    full: true,
    type: "submit",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "send",
      style: {
        width: 17,
        height: 17
      }
    })
  }, "Send message")))));
}
Object.assign(window, {
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Experience.jsx
try { (() => {
/* Experience — vertical Zeitstrahl. Mono year axis on the left, hairline
   spine with accent nodes, role entries. Composes Tag / SectionLabel. */
const {
  Tag,
  SectionLabel,
  Badge
} = window.MauriceDPpenDesignSystem_3628c1;
const TIMELINE = [{
  year: '2025',
  role: 'Senior DevOps Engineer',
  org: 'Helvetia Cloud',
  loc: 'Bern',
  blurb: 'Lead the platform team. Cut deploy time 8×, drove zero-trust rollout across 40 services.',
  tags: ['Kubernetes', 'Go', 'OPA'],
  now: true
}, {
  year: '2022',
  role: 'Fullstack Engineer',
  org: 'Nimbus Labs',
  loc: 'Remote',
  blurb: 'Owned product from Postgres to React. Shipped the billing + auth rewrite.',
  tags: ['TypeScript', 'React', 'Rust']
}, {
  year: '2020',
  role: 'Security Analyst',
  org: 'CERT-CH',
  loc: 'Bern',
  blurb: 'Incident response and threat modeling. Built the internal STRIDE tooling.',
  tags: ['Python', 'OWASP', 'Forensics']
}];
function Experience() {
  return /*#__PURE__*/React.createElement("section", {
    className: "bp-dots",
    style: {
      padding: '104px 64px 120px'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "02",
    accent: true
  }, "Zeitstrahl \u2014 Experience"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      position: 'relative'
    }
  }, TIMELINE.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: e.year,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: 28,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 600,
      fontSize: 22,
      letterSpacing: '0.02em',
      color: e.now ? 'var(--accent)' : 'var(--ink-0)'
    }
  }, e.year), e.now && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "Now"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: 32,
      paddingBottom: i === TIMELINE.length - 1 ? 0 : 64
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 4,
      bottom: 0,
      width: 1.5,
      background: i === TIMELINE.length - 1 ? 'transparent' : 'var(--line-1)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -5.5,
      top: 4,
      width: 13,
      height: 13,
      borderRadius: '50%',
      background: e.now ? 'var(--accent)' : 'var(--surface-page)',
      border: `1.5px solid ${e.now ? 'var(--accent)' : 'var(--ink-0)'}`
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '-0.02em',
      color: 'var(--ink-0)'
    }
  }, e.role), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.06em',
      color: 'var(--ink-2)',
      marginTop: 6,
      textTransform: 'uppercase'
    }
  }, e.org, " \xB7 ", e.loc), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontSize: 15,
      lineHeight: 1.55,
      color: 'var(--ink-1)',
      maxWidth: '56ch'
    }
  }, e.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 7,
      marginTop: 14
    }
  }, e.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    variant: "outline",
    size: "sm"
  }, t))))))));
}
Object.assign(window, {
  Experience
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Experience.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Footer.jsx
try { (() => {
/* Footer — mono meta row + back-to-top. Shared via window. */
function Footer({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1.5px solid var(--ink-0)',
      padding: '44px 64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Maurice D\xE4ppen"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--ok)'
    }
  }), "Open to work \xB7 Bern, CH"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('landing'),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--ink-2)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, "Back to top ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-up",
    style: {
      width: 13,
      height: 13
    }
  })));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Landing.jsx
try { (() => {
/* Landing — Swiss poster hero. Huge grotesque name, mono meta rails,
   blueprint texture, annotation callout, CTAs. Shared via window. */
const {
  Button,
  Tag,
  Badge
} = window.MauriceDPpenDesignSystem_3628c1;
function Landing({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "bp-grid",
    style: {
      padding: '112px 64px 128px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--ink-2)',
      marginBottom: 80
    }
  }, /*#__PURE__*/React.createElement("span", null, "Portfolio / 2026"), /*#__PURE__*/React.createElement("span", null, "46.9480\xB0 N \xB7 7.4474\xB0 E"), /*#__PURE__*/React.createElement("span", null, "Bern \u2014 CH")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--ink-2)',
      letterSpacing: '0.04em'
    }
  }, "Fullstack \xB7 DevOps \xB7 Security \xB7 AI")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'clamp(56px, 9vw, 128px)',
      lineHeight: 0.94,
      letterSpacing: '-0.04em',
      margin: 0,
      color: 'var(--ink-0)'
    }
  }, "Maurice", /*#__PURE__*/React.createElement("br", null), "D\xE4ppen", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: '46ch',
      marginTop: 36,
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--ink-1)'
    }
  }, "I build and secure resilient systems \u2014 from CI/CD pipelines to zero-trust gateways \u2014 and I think hard about how they break."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 44,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => onNavigate('projects'),
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right",
      style: {
        width: 18,
        height: 18
      }
    })
  }, "View selected work"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    mono: true,
    onClick: () => onNavigate('contact')
  }, "Get in touch")))));
}
Object.assign(window, {
  Landing
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Nav.jsx
try { (() => {
/* Nav — sticky top bar: monogram + wordmark left, mono section links right.
   Tab-switch navigation (onNavigate). Shared via window. */
const {
  IconButton
} = window.MauriceDPpenDesignSystem_3628c1;
function Nav({
  active,
  onNavigate
}) {
  const links = [{
    id: 'landing',
    n: '00',
    label: 'Index'
  }, {
    id: 'projects',
    n: '01',
    label: 'Work'
  }, {
    id: 'experience',
    n: '02',
    label: 'Timeline'
  }, {
    id: 'about',
    n: '03',
    label: 'About'
  }, {
    id: 'contact',
    n: '04',
    label: 'Contact'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 64px',
      background: 'color-mix(in srgb, var(--surface-page) 86%, transparent)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1.5px solid var(--ink-0)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('landing'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      background: 'var(--ink-0)',
      color: 'var(--paper-1)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: '-0.04em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }
  }, "MD", /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 5,
      bottom: 5,
      width: 4,
      height: 4,
      borderRadius: '50%',
      background: 'var(--accent)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 17,
      letterSpacing: '-0.02em',
      color: 'var(--ink-0)'
    }
  }, "Maurice\xA0D\xE4ppen", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "."))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, links.slice(1).map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => onNavigate(l.id),
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 6,
      padding: '8px 12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: active === l.id ? 'var(--accent)' : 'var(--ink-2)',
      fontWeight: active === l.id ? 600 : 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: active === l.id ? 'var(--accent)' : 'var(--ink-3)'
    }
  }, l.n), l.label)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 22,
      background: 'var(--line-1)',
      margin: '0 10px'
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    label: "GitHub",
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "github"
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "LinkedIn",
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "linkedin"
  }))));
}
Object.assign(window, {
  Nav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Projects.jsx
try { (() => {
/* Projects — Swiss case-study grid. Featured project spans wide; rest in
   a 2-col grid. Composes Card / Tag / SpecList / SectionLabel. */
const {
  Card,
  Tag,
  SpecList,
  SectionLabel,
  Button
} = window.MauriceDPpenDesignSystem_3628c1;
const PROJECTS = [{
  n: '01',
  title: 'Sentinel',
  tagline: 'Zero-trust API gateway',
  blurb: 'Identity-aware proxy enforcing mTLS + OPA policy across a 40-service mesh. Policy-as-code, signed images, full audit trail.',
  tags: ['Go', 'Kubernetes', 'OPA', 'mTLS', 'Envoy'],
  specs: [{
    key: 'Role',
    value: 'Lead'
  }, {
    key: 'Scale',
    value: '40 svc'
  }, {
    key: 'Year',
    value: '2025'
  }],
  featured: true
}, {
  n: '02',
  title: 'Forge CI',
  tagline: 'Self-hosted CI/CD platform',
  blurb: 'Reproducible pipelines on Nix + Rust runners. Hermetic builds, sub-second cache hits.',
  tags: ['Rust', 'Nix', 'Docker'],
  specs: [{
    key: 'Role',
    value: 'Author'
  }, {
    key: 'Year',
    value: '2024'
  }]
}, {
  n: '03',
  title: 'Vault Recon',
  tagline: 'Secrets & threat scanner',
  blurb: 'STRIDE automation wired into CI. Catches leaked keys and model drift before merge.',
  tags: ['Python', 'OWASP', 'GitHub Actions'],
  specs: [{
    key: 'Role',
    value: 'Author'
  }, {
    key: 'Year',
    value: '2023'
  }]
}, {
  n: '04',
  title: 'Aether',
  tagline: 'Real-time observability',
  blurb: 'Streaming metrics dashboard over eBPF probes. p99 latency surfaced in 200ms.',
  tags: ['TypeScript', 'React', 'eBPF', 'Grafana'],
  specs: [{
    key: 'Role',
    value: 'Fullstack'
  }, {
    key: 'Year',
    value: '2023'
  }]
}];
function ProjectCard({
  p,
  featured
}) {
  return /*#__PURE__*/React.createElement(Card, {
    variant: featured ? 'raised' : 'plain',
    interactive: true,
    cornerTicks: true,
    index: p.n,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      gridColumn: featured ? '1 / -1' : 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: featured ? 'grid' : 'block',
      gridTemplateColumns: featured ? '1.4fr 1fr' : '1fr',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      marginBottom: 8
    }
  }, p.tagline), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: featured ? 44 : 28,
      letterSpacing: '-0.03em',
      margin: '0 0 12px',
      color: 'var(--ink-0)'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: featured ? 16 : 14,
      lineHeight: 1.55,
      color: 'var(--ink-2)',
      maxWidth: '52ch'
    }
  }, p.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 7,
      marginTop: 18
    }
  }, p.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    size: "sm"
  }, t)))), featured && /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '1px solid var(--line-0)',
      paddingLeft: 24,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(SpecList, {
    items: p.specs
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    mono: true,
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-up-right",
      style: {
        width: 16,
        height: 16
      }
    }),
    style: {
      marginTop: 20,
      alignSelf: 'flex-start'
    }
  }, "Case study"))), !featured && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 14,
      borderTop: '1px solid var(--line-0)'
    }
  }, /*#__PURE__*/React.createElement(SpecList, {
    items: p.specs,
    dense: true,
    style: {
      flexDirection: 'row',
      gap: 18,
      flex: 'unset'
    }
  }), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-up-right",
    style: {
      width: 18,
      height: 18,
      color: 'var(--ink-1)'
    }
  })));
}
function Projects() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '104px 64px 120px'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "01",
    accent: true
  }, "Selected work"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: '54ch',
      margin: '28px 0 52px',
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--ink-1)'
    }
  }, "Four systems I designed, shipped, and kept alive in production. Each one traded a sharp constraint for a measurable result."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 28
    }
  }, PROJECTS.map(p => /*#__PURE__*/React.createElement(ProjectCard, {
    key: p.n,
    p: p,
    featured: p.featured
  }))));
}
Object.assign(window, {
  Projects
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Projects.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.TextArea = __ds_scope.TextArea;

__ds_ns.Annotation = __ds_scope.Annotation;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.SpecList = __ds_scope.SpecList;

})();
