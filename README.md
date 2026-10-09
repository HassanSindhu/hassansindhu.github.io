# Hassan Iqbal — Portfolio

A responsive, static portfolio with a dark cyan theme, Hassan's original portrait, technical framing, and an interactive published-app explorer. No build tools or installation required. Ambient effects can be paused with the FX control and are disabled for visitors who prefer reduced motion.

## Preview

Open `index.html` in a browser, or run:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Then visit http://localhost:4173. Clipboard copying works on localhost and HTTPS; a manual-copy message appears when browser permissions prevent it.

## Edit

- `index.html`: page copy, links, project cards, and interface illustrations.
- `styles.css`: layout, responsive breakpoints, colors, and typography. Main colors are in `:root`.
- `portfolio-additions.css`: published-app showcases, actual store artwork, and the AI section.
- `dark-theme.css`: dark component surfaces and the cyan/blue palette.
- `portfolio-layout.css`: the current portrait-led layout, project explorer, section navigation, and responsive refinements. Loaded last.
- `script.js`: project descriptions, filters, mobile navigation, and email copying.
- `explorer.js`: project tabs, previous/next navigation, swipe gestures, keyboard controls, section indicators, and motion settings.
- `assets/hassan.jpeg`: Hassan's supplied original photograph, displayed with CSS cropping and overlays.
- `assets/fonts/`: locally hosted DM Sans and Rajdhani fonts with their open-source licenses.
- `assets/apps/`: app icons and promotional screenshots from the supplied Google Play developer page. See `SOURCES.md` in that folder for provenance.
- `original-portfolio.html`: unchanged backup of the previous website.

The portfolio features **15 published apps**, verified in the developer page's Pakistan view on October 9, 2026. Six have detailed showcases and explorer entries; nine more appear in the published-app directory. The count is derived from these entries at page load, with an accurate static fallback. The healthcare and computer vision work from the original page remain separate from this published-app count. Store availability varies by country: the US view does not show the complete catalogue.

Published app descriptions use the store listings; the listed publisher is Forestry and Wildlife Department Punjab. The Doconline and mask-detection visuals remain labeled illustrations. Six additional AI/computer vision directions are explicitly presented as project ideas, not completed projects. Experience is 5+ years, as supplied by Hassan.

Fonts, photo, and app imagery are served locally. Store, LinkedIn, and email links point to the existing external destinations.

## Publish

Upload `index.html`, `styles.css`, `portfolio-additions.css`, `dark-theme.css`, `portfolio-layout.css`, `script.js`, `explorer.js`, and the `assets/` folder together to any static web host. No server or build step is needed. The backup and `.preview` folder are not needed for publishing.
