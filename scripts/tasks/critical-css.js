const fs = require('fs-extra');
const path = require('path');
const { generate } = require('critical');
const { DIST, SITE_PAGES } = require('../utils/config');

module.exports = async function criticalCss() {
  // Read font-fallbacks.css to always include in critical CSS
  const fontFallbacks = await fs.readFile(path.join(DIST, 'css', 'font-fallbacks.css'), 'utf8');

  for (const page of SITE_PAGES) {
    const htmlPath = path.join(DIST, page);

    try {
      const { html } = await generate({
        src: page,
        base: DIST,
        inline: true,
        width: 1300,
        height: 900,
        // Also extract for mobile viewport
        dimensions: [
          { width: 375, height: 812 },
          { width: 1300, height: 900 },
        ],
        // Penthouse options
        penthouse: {
          timeout: 60000,
        },
      });

      // Inject font-fallbacks into the first <style> tag (critical CSS)
      const result = html.replace(
        /<style>([\s\S]*?)<\/style>/,
        (match, css) => `<style>${fontFallbacks}${css}</style>`
      );

      await fs.writeFile(htmlPath, result);
    } catch (err) {
      console.warn(`  ⚠ Critical CSS failed for ${page}: ${err.message}`);
      // Fallback: manually inline font-fallbacks and add preload hints
      let html = await fs.readFile(htmlPath, 'utf8');

      // Add font-fallbacks as inline style before existing CSS links
      const fallbackStyle = `<style>${fontFallbacks}</style>`;
      html = html.replace('</head>', `${fallbackStyle}\n</head>`);

      // Convert CSS links to async pattern
      html = html.replace(
        /<link rel="stylesheet" href="(css\/(?:style|boxicons\.min)\.css)">/g,
        '<link rel="stylesheet" href="$1" media="print" onload="this.media=\'all\'">'
      );

      // Add noscript fallback
      const noscript = `<noscript><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/boxicons.min.css"></noscript>`;
      html = html.replace('</head>', `${noscript}\n</head>`);

      // Add preload for boxicons font
      html = html.replace('</head>', `<link rel="preload" href="fonts/boxicons.woff2" as="font" type="font/woff2" crossorigin>\n</head>`);

      await fs.writeFile(htmlPath, html);
    }
  }

  // Remove font-fallbacks.css from dist (it's now inlined)
  await fs.remove(path.join(DIST, 'css', 'font-fallbacks.css'));

  console.log('  ✓ Critical CSS extracted and inlined');
};
