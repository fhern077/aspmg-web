const fs = require('fs-extra');
const path = require('path');
const { PurgeCSS } = require('purgecss');
const postcss = require('postcss');
const cssnano = require('cssnano');
const { SRC, DIST, PURGECSS_SAFELIST } = require('../utils/config');

module.exports = async function css() {
  // 1. Read font-fallbacks.css (no purge needed — just @font-face declarations)
  const fontFallbacks = await fs.readFile(path.join(SRC, 'css', 'font-fallbacks.css'), 'utf8');

  // 2. Purge base.css + style.css against HTML content
  const purged = await new PurgeCSS().purge({
    content: [
      path.join(SRC, '*.html'),
      path.join(SRC, 'js', '*.js'),
    ],
    css: [
      path.join(SRC, 'css', 'base.css'),
      path.join(SRC, 'css', 'style.css'),
    ],
    safelist: {
      standard: PURGECSS_SAFELIST.standard,
      greedy: PURGECSS_SAFELIST.greedy,
    },
  });

  // 3. Merge font-fallbacks + purged CSS into one string
  const merged = fontFallbacks + '\n' + purged.map(r => r.css).join('\n');

  // 4. Minify with cssnano
  const result = await postcss([cssnano({ preset: 'default' })]).process(merged, { from: undefined });

  // Write merged+minified CSS as single style.css
  await fs.ensureDir(path.join(DIST, 'css'));
  await fs.writeFile(path.join(DIST, 'css', 'style.css'), result.css);

  console.log('  ✓ CSS purged, merged (font-fallbacks + base + style), and minified');
};
