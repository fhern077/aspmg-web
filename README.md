<p align="center">
  <img src="src/img/logo.png" alt="ASPMG Logo" width="120">
</p>

<h1 align="center">ASPMG Web</h1>

<p align="center">
  <strong>The digital home of A Solid Property Management Group</strong><br>
  Miami-Dade & Broward County's finest HOA & condo management — now in HTML form.
</p>

<p align="center">
  <a href="https://aspmg.com">aspmg.com</a>
</p>

---

## What's This?

The marketing site for **ASPMG** — a property management company that's been keeping South Florida communities running smoothly for 20+ years. This repo powers the public-facing website: service pages, document portals, payment links, a brand kit, and more.

No React. No Next.js. No 400MB `node_modules` to manage your apartment complex. Just clean HTML, CSS, and a sprinkle of vanilla JS.

## Tech Stack

| Layer | Tech |
|-------|------|
| **Markup** | Hand-written HTML5 — the way the founding fathers intended |
| **Styles** | Custom CSS + purged Bootstrap grid (we kept the grid, ditched the bloat) |
| **JS** | Vanilla ES6 — zero frameworks, zero regrets |
| **Fonts** | [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) + [Sora](https://fonts.google.com/specimen/Sora) |
| **Icons** | [Boxicons](https://boxicons.com/) |
| **i18n** | EN/ES toggle with Cuban Spanish dialect (porque Miami) |
| **Build** | Node scripts for CSS purging, image optimization, critical CSS extraction |
| **Hosting** | GitHub Pages + Cloudflare |

## Project Structure

```
aspmg-web/
├── src/
│   ├── css/            # Stylesheets (base, style, font-fallbacks, boxicons)
│   ├── docs/           # Community PDFs (applications, ACH forms)
│   ├── fonts/          # Boxicons font files
│   ├── img/            # Images, favicons, OG assets
│   ├── js/             # main.js + i18n.js
│   ├── templates/      # Brand Kit — logos, document templates, previews
│   ├── index.html      # Homepage
│   ├── documents.html  # Document portal
│   └── payments.html   # Payment links
├── scripts/            # Build pipeline
│   ├── build.js
│   └── tasks/          # clean, copy, css, fonts, html, images, js, seo, critical-css
└── package.json
```

## Performance

Lighthouse scores we're proud of:

```
 Performance ......... 96  (desktop)
 Accessibility ....... 97
 Best Practices ...... 100
 SEO ................. 100
 CLS ................. 0
 TBT ................. 0ms
```

The secret? Ship less JavaScript than a "Hello World" Create React App.

## Build

```bash
npm install
npm run build    # Purge CSS, optimize images, extract critical CSS, minify everything
```

Output lands in `dist/`. Or just open `src/index.html` in a browser — it works without a build step too.

## Bilingual

Hit the `EN | ES` toggle in the top bar. The Spanish translations use Cuban dialect because this is Miami and we respect the culture.

```js
// i18n.js knows what's up
"services_title": "Servicios de Administración"
"hero_cta": "Solicite una Propuesta"
```

## License

Proprietary — this is a real business website, not a template.

---

<p align="center">
  <sub>Built with cafecito and zero npm vulnerabilities</sub>
</p>
