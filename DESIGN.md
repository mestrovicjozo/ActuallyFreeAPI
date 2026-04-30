---
name: ActuallyFreeAPI
colors:
  brand: "#00E5A0"
  brand-glow: "rgba(0, 229, 160, 0.05)"
  brand-tint-10: "rgba(0, 229, 160, 0.1)"
  brand-tint-15: "rgba(0, 229, 160, 0.15)"
  brand-tint-20: "rgba(0, 229, 160, 0.2)"
  brand-tint-30: "rgba(0, 229, 160, 0.3)"
  brand-tint-40: "rgba(0, 229, 160, 0.4)"
  surface: "#09090b"
  surface-raised: "#18181b"
  surface-card: "rgba(24, 24, 27, 0.4)"
  surface-card-alt: "rgba(24, 24, 27, 0.3)"
  surface-overlay: "rgba(24, 24, 27, 0.2)"
  surface-nav: "rgba(9, 9, 11, 0.8)"
  surface-code: "rgba(2, 6, 11, 0.6)"
  on-surface: "#f4f4f5"
  on-surface-secondary: "#a1a1aa"
  on-surface-muted: "#71717a"
  on-surface-faint: "#52525b"
  on-brand: "#09090b"
  border: "#27272a"
  border-subtle: "rgba(39, 39, 42, 0.6)"
  border-hover: "#3f3f46"
  scrollbar: "#27272a"
  scrollbar-hover: "#3f3f46"
  selection-bg: "rgba(0, 229, 160, 0.2)"
  selection-text: "#f4f4f5"
  dot-grid: "rgba(255, 255, 255, 0.025)"
  focus-ring: "#00E5A0"
  category-general: "#60a5fa"
  category-markets: "#22d3ee"
  category-technology: "#34d399"
  category-business: "#fbbf24"
  category-investing: "#fb7185"
  category-stocks: "#a78bfa"
  category-other: "#a1a1aa"
  syntax-key: "#00E5A0"
  syntax-string: "#38bdf8"
  syntax-number: "#fbbf24"
  syntax-boolean: "#fb7185"
  syntax-null: "#71717a"
  syntax-punctuation: "#52525b"
  http-get-bg: "rgba(16, 185, 129, 0.15)"
  http-get-text: "#34d399"
  http-get-border: "rgba(16, 185, 129, 0.2)"
typography:
  display:
    fontFamily: Bricolage Grotesque
    fontSize: 72px
    fontWeight: "700"
    lineHeight: 1.05
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 1.05
    letterSpacing: -0.02em
  heading-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 36px
    fontWeight: "700"
    lineHeight: 1.2
    letterSpacing: -0.02em
  heading-md:
    fontFamily: Bricolage Grotesque
    fontSize: 30px
    fontWeight: "700"
    lineHeight: 1.2
    letterSpacing: -0.02em
  stat:
    fontFamily: Bricolage Grotesque
    fontSize: 30px
    fontWeight: "700"
    lineHeight: 1.2
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 1.625
  body-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.5
  body-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 1.5
  label:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 1.4
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 1.33
    letterSpacing: 0.05em
    textTransform: uppercase
  nav:
    fontFamily: Bricolage Grotesque
    fontSize: 14px
    fontWeight: "600"
    letterSpacing: -0.01em
  code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.7
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 1.5
  code-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: "700"
    lineHeight: 1
  logo-mark:
    fontFamily: Bricolage Grotesque
    fontSize: 11px
    fontWeight: "800"
    lineHeight: 1
rounded:
  sm: 3px
  DEFAULT: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  section-y: 80px
  section-y-sm: 64px
  hero-top: 128px
  hero-bottom: 64px
  container-x: 24px
  card-padding: 20px
  card-padding-sm: 16px
  card-gap: 12px
  heading-gap: 12px
  heading-to-content: 40px
  nav-height: 56px
  grid-dot-size: 24px
  scrollbar-width: 6px
layout:
  max-width-content: 896px
  max-width-wide: 1152px
  grid-columns-sm: 1
  grid-columns-md: 2
  grid-columns-lg: 3
  grid-columns-features: 4
elevation:
  nav-blur: 24px
  hero-glow-blur: 24px
  dot-grid-size: 24px
motion:
  entrance-duration: 0.5s
  entrance-duration-slow: 0.6s
  entrance-y-offset: 16px
  entrance-y-offset-lg: 24px
  entrance-stagger: 0.08s
  scroll-trigger-margin: -80px
  hover-transition: 150ms
  ping-duration: 1.5s
  copy-feedback-duration: 2000ms
  easing: ease-out
  reduced-motion: 0.01ms
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    typography: "{typography.label}"
    fontWeight: "600"
    rounded: "{rounded.lg}"
    paddingX: 20px
    paddingY: 10px
    hover: "brightness(1.1)"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.on-surface-secondary}"
    typography: "{typography.label}"
    fontWeight: "600"
    rounded: "{rounded.lg}"
    paddingX: 20px
    paddingY: 10px
    borderColor: "{colors.border-hover}"
    borderWidth: 1px
    hoverBackground: "rgba(39, 39, 42, 0.6)"
    hoverBorderColor: "#52525b"
  nav-bar:
    backgroundColor: "{colors.surface-nav}"
    backdropBlur: "{elevation.nav-blur}"
    height: "{spacing.nav-height}"
    borderBottomColor: "{colors.border-subtle}"
    accentLine: "linear-gradient(to right, transparent, {colors.brand-tint-40}, transparent)"
  nav-link:
    textColor: "{colors.on-surface-secondary}"
    rounded: "{rounded.md}"
    paddingX: 14px
    paddingY: 6px
    hoverTextColor: "{colors.on-surface}"
    hoverBackground: "rgba(39, 39, 42, 0.6)"
  nav-link-active:
    textColor: "{colors.brand}"
    backgroundColor: "{colors.brand-tint-10}"
  logo-mark:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    rounded: "{rounded.md}"
    size: 28px
    typography: "{typography.logo-mark}"
  card-standard:
    backgroundColor: "{colors.surface-card}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding-sm}"
    hoverBorderColor: "{colors.border-hover}"
  card-source:
    backgroundColor: "{colors.surface-card-alt}"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding-sm}"
    hoverBorderColor: "{colors.border-hover}"
  card-feature:
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
    hoverBorderColor: "{colors.border-hover}"
  card-feature-icon:
    backgroundColor: "{colors.brand-tint-10}"
    borderColor: "{colors.brand-tint-20}"
    rounded: "{rounded.lg}"
    size: 36px
    iconColor: "{colors.brand}"
    iconSize: 16px
  terminal-window:
    backgroundColor: "{colors.surface-code}"
    borderColor: "{colors.border}"
    rounded: "{rounded.xl}"
    headerBackground: "rgba(24, 24, 27, 0.8)"
    headerBorderColor: "{colors.border}"
    dotColor: "{colors.border-hover}"
    dotSize: 12px
  filter-pill:
    borderColor: "{colors.border}"
    textColor: "{colors.on-surface-secondary}"
    rounded: "{rounded.md}"
    paddingX: 12px
    paddingY: 6px
    hoverTextColor: "{colors.on-surface}"
    hoverBorderColor: "{colors.border-hover}"
  filter-pill-active:
    backgroundColor: "{colors.brand-tint-15}"
    textColor: "{colors.brand}"
    borderColor: "{colors.brand-tint-30}"
  status-dot:
    size: 8px
    color: "{colors.brand}"
    pingOpacity: 0.75
    animation: ping
  http-badge:
    backgroundColor: "{colors.http-get-bg}"
    textColor: "{colors.http-get-text}"
    borderColor: "{colors.http-get-border}"
    typography: "{typography.code-xs}"
    rounded: "{rounded.DEFAULT}"
    paddingX: 6px
    paddingY: 2px
  copy-button:
    textColor: "{colors.on-surface-secondary}"
    borderColor: "{colors.border-hover}"
    rounded: "{rounded.md}"
    paddingX: 10px
    paddingY: 4px
    hoverTextColor: "{colors.on-surface}"
    hoverBorderColor: "#52525b"
  stats-bar:
    backgroundColor: "{colors.surface-overlay}"
    borderColor: "{colors.border-subtle}"
  endpoint-row:
    backgroundColor: "{colors.surface-card}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
    hoverBorderColor: "{colors.border-hover}"
  divider:
    color: "{colors.border}"
    width: 1px
---

## Brand & Style

ActuallyFreeAPI is a developer-facing financial data product. The design language communicates two things simultaneously: **credibility** (this is real financial data from premium sources) and **accessibility** (there are zero barriers to entry). The visual identity resolves this tension through a dark, data-dense aesthetic punctuated by a single, high-energy accent color.

The overall mood is **terminal-inspired minimalism** — the kind of interface a developer trusts on instinct. Backgrounds are near-black, typography is crisp and functional, and the brand color (#00E5A0) appears sparingly but decisively: on CTAs, active states, code output, and the hero headline. The result feels like a premium fintech tool that someone forgot to put a paywall on.

## Colors

The palette is monochromatic zinc with a single chromatic accent.

- **Brand (#00E5A0):** A saturated mint-green chosen for its high contrast against dark surfaces and its association with upward-trending financial data. It is used exclusively for interactive elements, active states, and moments of emphasis — never decoratively. At full opacity it appears on primary buttons and the hero tagline. At reduced opacity (5–40%) it creates glows, tinted backgrounds, and selection highlights.
- **Surfaces:** The background is zinc-950 (#09090b), essentially pure black with enough blue to avoid feeling "dead." Cards and raised surfaces use zinc-900 (#18181b) at 30–40% opacity, creating just enough separation without hard visual boundaries. The navbar uses an 80%-opacity version of the base surface with a 24px backdrop blur, giving it a frosted-glass presence.
- **Text:** Four tiers — zinc-100 (#f4f4f5) for headings and primary content, zinc-400 (#a1a1aa) for body and secondary text, zinc-500 (#71717a) for metadata and labels, and zinc-600 (#52525b) for the faintest elements like JSON punctuation.
- **Borders:** zinc-800 (#27272a) is the default. Most borders run at 60% opacity to avoid a "caged" feeling. Hover states brighten to zinc-700 (#3f3f46).
- **Category Colors:** Seven distinct hues (blue, cyan, emerald, amber, rose, violet, zinc) identify news feed categories. These only appear as small 8px indicator dots and never bleed into the surrounding UI.
- **Syntax Highlighting:** JSON previews use a four-color scheme — brand green for keys, sky-blue for strings, amber for numbers, and rose for booleans — mapping to developer expectations from popular dark editor themes.

## Dot Grid Background

A fixed, full-viewport dot grid provides subtle texture to the otherwise flat black canvas. Each dot is a 1px radial gradient at 2.5% white opacity, spaced on a 24px grid. This prevents the background from feeling like an empty void while remaining invisible at a conscious level. The grid is applied via a `::before` pseudo-element on `body` with `pointer-events: none` so it never interferes with interaction.

## Typography

Three typefaces cover all use cases with no overlap:

- **Bricolage Grotesque** (headings, logo, stats): A variable-weight grotesque with distinctive character. Its slightly condensed proportions and sharp terminals give headlines a confident, editorial quality. Used at bold (700) to extrabold (800) weights. All headings use tight negative tracking (-0.02em) to feel dense and intentional.
- **DM Sans** (body, labels, descriptions): A clean geometric sans-serif that reads effortlessly at small sizes. Used at regular (400) to medium (500) weights. Body text gets generous line-height (1.625) for comfortable reading. Stat labels beneath the stats bar use uppercase with wide letter-spacing (0.05em) to create a "data dashboard" feel at 12px.
- **JetBrains Mono** (code, endpoints, terminal): A monospaced font purpose-built for code legibility. Used in the quick-start examples, JSON preview, endpoint paths, and HTTP method badges. The font's ligatures and distinct character shapes make curl commands and JSON instantly scannable.

All three fonts load via Google Fonts with `display: swap` and are injected as CSS custom properties (`--font-heading`, `--font-body`, `--font-mono`).

## Spacing & Layout

The spacing system is built on a 4px base unit. Common increments are 4, 8, 12, 16, 20, and 24px. Section vertical rhythm uses a consistent 80px (py-20) padding, creating a steady pulse as users scroll.

Two container widths frame all content:
- **896px (max-w-4xl):** Used for focused, single-column content — hero, quick start, JSON preview, endpoints.
- **1152px (max-w-6xl):** Used for multi-column grids — source cards (3 columns), feature cards (4 columns), stats bar, navigation.

Horizontal container padding is 24px on all breakpoints. Cards use 16–20px internal padding with 12px gaps between grid items. Section headings sit 12px above their subtitle and 40px above the content block they introduce.

The hero section begins at 128px from the top (accounting for the fixed 56px navbar) and 64px below, establishing visual authority before the stats bar.

## Shapes & Borders

The shape language is restrained and functional:

- **Cards and buttons:** 12px radius (rounded-lg) — large enough to feel modern, small enough to remain structured.
- **Terminal windows:** 16px radius (rounded-xl) — slightly softer to evoke actual application chrome.
- **Filter pills, nav links, badges:** 8px radius (rounded-md) — compact interactive elements.
- **Status dots and category indicators:** Full circles (9999px radius).

Borders are 1px solid throughout. No element uses borders thicker than 1px. Most card borders use 60% opacity to create a "suggested" boundary rather than a hard container edge.

## Elevation & Depth

Depth is communicated through **transparency and blur** rather than shadows. The design system uses zero box-shadows.

- **Level 0 (Canvas):** The dot-grid background at z-index 0.
- **Level 1 (Content):** All page content sits at z-index 1, above the grid.
- **Level 2 (Navigation):** The fixed navbar at z-index 50, using `backdrop-blur-xl` (24px) with 80% background opacity. A 1px gradient accent line (transparent → brand at 40% → transparent) runs along the top edge, giving the navbar a subtle "lit from above" effect.

The hero section uses a large brand-colored glow (blur-2xl / 24px, 5% opacity) behind the "Actually Free" text to create a radiant focal point without introducing a visible shape.

Cards gain depth through background opacity differences (40% vs 30%) and border brightness changes on hover, rather than through traditional shadow elevation.

## Motion & Animation

Motion is purposeful and brief. Every animation serves one of two goals: **orient the user** (entrance reveals) or **confirm interaction** (hover/click feedback).

- **Entrance animations:** Elements fade in (opacity 0 → 1) and slide up (y: 16px or 24px → 0) over 0.5–0.6 seconds with an ease-out curve. Sequential elements stagger at 80ms intervals. Scroll-triggered sections use Framer Motion's `whileInView` with a -80px viewport margin so content appears just before it enters the center of the screen.
- **Hover transitions:** All interactive color changes (border brightening, text lightening) use CSS `transition-colors` at approximately 150ms, fast enough to feel instant but smooth enough to avoid flicker.
- **Status indicator:** The "Live" dot uses a CSS ping animation — a clone of the dot scales outward and fades, looping continuously. This is the only looping animation in the entire interface.
- **Copy feedback:** Clipboard actions swap button text to "Copied" for 2 seconds, then revert. No toast notifications or overlays.
- **Reduced motion:** The system respects `prefers-reduced-motion: reduce` globally, collapsing all animation durations to 0.01ms and disabling smooth scrolling.

## Components

### Navigation Bar

A fixed, full-width bar with frosted-glass transparency. Contains the logo mark (a 28px rounded-md square in brand green with "AF" in extrabold heading font), the site name, navigation links, a vertical 1px divider, and a GitHub icon link. Active nav links receive a brand-green tint (text + 10% background fill). The top-edge accent gradient is the only decorative element.

### Hero Section

The largest typographic moment: a two-line headline with "Financial News API." in zinc-100 and "Actually Free." in brand green, backed by a soft radial glow. Below sits a single paragraph in zinc-400 body text, then two buttons (primary green, secondary outlined). A status pill above the headline shows a pinging green dot with "Live / Always Free" in zinc-400 label text, bordered in zinc-800 with a zinc-900/60 background.

### Stats Bar

A horizontal strip bordered top and bottom in zinc-800/60 with a zinc-900/20 background. Four centered stat blocks show large numbers in heading font and uppercase zinc-500 labels beneath. The "Free" stat renders in brand green for emphasis.

### Code Cards (Quick Start)

Two-column grid of cards with a header row (title, description, copy button) separated by a border from the code row below. Code text renders in brand green monospace with a zinc-500 dollar-sign prompt prefix. The copy button is a small bordered pill that swaps to "Copied" on click.

### Terminal Window (JSON Preview)

A full-width card with rounded-xl corners. The header mimics application chrome: three gray dots (12px circles), an HTTP method badge (emerald-tinted "GET"), and the endpoint path in monospace. The body area has a darker background (zinc-950/60) with syntax-highlighted JSON. Each line highlights on hover with a subtle zinc-800/30 background.

### Source Cards

Three-column grid of compact cards. Each card contains an 8px colored category dot, the source name in zinc-200 medium weight, and the category label in zinc-500 small text. A filter pill bar above lets users filter by category — active pills invert to brand-green tinting.

### Feature Cards

Four-column grid of cards with icon containers (36px rounded-lg squares with brand-green 10% fill and 20% border), a title in zinc-100 semibold, and a description in zinc-500 small body text.

### Footer

A bordered strip with the logo mark, site name, text links (GitHub, Documentation) in zinc-500 with hover to zinc-300, and a "Built with" attribution in zinc-600.
