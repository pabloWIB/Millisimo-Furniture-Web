# Millisimo — Nevada Collection

A single-page presentation of NEVADA, MILLISIMO's 2023 collection of industrial chairs. Static HTML, CSS and JavaScript, no build step and no dependencies.

[![Live demo](https://img.shields.io/badge/demo-pablowib.github.io/Millisimo-Furniture-Web-2ea44f)](https://pablowib.github.io/Millisimo-Furniture-Web)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)
![First load](https://img.shields.io/badge/first%20load-162%20KB-blue)

## Description

A furniture collection page that treats chairs the way a gallery treats objects: large, isolated, one at a time. The brand is MILLISIMO and the range on show is NEVADA — industrial chairs in wood and metal, presented across a full-height cover, an introduction to the collection and a two-piece gallery.

The page is a presentation, not a shop. There is no cart, no price list and no product detail pages, and nothing on it pretends otherwise.

## Features

- Full-height cover with the collection wordmark set at display scale.
- Fixed-attachment image band, restricted to pointer devices at 1024px and up, where it actually works.
- Mobile menu with background scroll lock, close on Escape, close on link click and focus returned to the toggle.
- Current section tracked with `IntersectionObserver` and exposed as `aria-current`.
- WCAG AA contrast throughout: body text 5.06:1 or better, accents 7.70:1.
- Images served as WebP with intrinsic `width`/`height`, so the layout does not shift on load.
- No build step, no npm dependencies, no framework.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html` |
| Styling | CSS3 custom properties | Three layers: `base.css`, `layout.css`, `components.css` |
| Behaviour | Vanilla JavaScript (ES5 syntax, IIFE) | `assets/js/main.js` — mobile menu and section tracking |
| Type | Inter, via Google Fonts | Preconnected, `display=swap` |
| Images | WebP, PNG | Converted and resized from the original JPEG and PNG sources |
| Hosting | GitHub Pages | Static, no build command |

`main.js` is a classic deferred script rather than an ES module on purpose: `file://` blocks module imports, and the page is meant to work when `index.html` is opened straight from disk.

## Project structure

```
.
├── index.html                  # The collection page
├── 404.html                    # Error page, noindex, links back to the collection
├── robots.txt                  # Allows everything, points at the sitemap
├── sitemap.xml                 # One URL: the collection page
├── assets/
│   ├── css/
│   │   ├── base.css            # Custom properties, reset, base typography
│   │   ├── layout.css          # Container, hero, sections, footer, breakpoints
│   │   └── components.css      # Nav, mobile menu, banner, gallery, links
│   ├── js/
│   │   └── main.js             # Only script on the site
│   └── img/
│       ├── content/            # Hero, banner, gallery, Open Graph image
│       └── logo/               # Collection mark and favicons
└── docs/
    ├── auditoria.md            # Audit of the project before the reorganisation
    └── cambios.md              # What changed, grouped by phase
```

Load order matters: `base.css` defines the custom properties the other two consume.

## Running locally

The site is static with no build step, so opening the file works:

```bash
open index.html      # macOS
start index.html     # Windows
```

To serve it over HTTP instead:

```bash
npx http-server -p 4291
# or
python -m http.server 4291
```

Then visit `http://localhost:4291`.

Serving over HTTP is what production does, and it is the only way to exercise `404.html`, which a local file open will never reach.

## Editing

There is nothing to compile. Edit the CSS and JavaScript directly.

Design tokens all live in `:root` in `assets/css/base.css` — colour, spacing, type scale, transitions. Change a value there and it propagates. The spacing scale is 4/8/16/24/32/48/64/96; stick to it rather than adding one-off pixel values.

Adding a chair means adding a `<li>` to the gallery in `index.html` and its image to `assets/img/content/`. There is no data file. Keep new images at 800px wide or less, give each one a real `alt`, and set `width` and `height` so the grid does not shift while they load.

## Accessibility and performance

Verified with headless Chrome across 360, 480, 768, 1024 and 1440px:

- No horizontal scroll at any of those widths.
- No console errors or warnings on either page.
- One `h1` per page, heading hierarchy without gaps.
- Every interactive target at least 44×44px.
- Visible focus ring on every interactive element.
- First load 162 KB, including images.

## Deployment

Deployed on GitHub Pages at [pablowib.github.io/Millisimo-Furniture-Web](https://pablowib.github.io/Millisimo-Furniture-Web). Static: upload the repository root as-is, no build command and no output directory. GitHub Pages serves `404.html` for unknown routes automatically, so no routing configuration is needed.

If you deploy somewhere else, update the absolute URLs in `sitemap.xml`, `robots.txt` and the `canonical` and Open Graph tags in `index.html` — they point at `pablowib.github.io/Millisimo-Furniture-Web`.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
