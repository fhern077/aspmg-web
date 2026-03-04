const fs = require('fs-extra');
const path = require('path');
const { PurgeCSS } = require('purgecss');
const postcss = require('postcss');
const cssnano = require('cssnano');
const { SRC, DIST, PURGECSS_SAFELIST } = require('../utils/config');

module.exports = async function css() {
  // 1. Purge base.css + style.css against HTML content
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

  // 2. Merge purged CSS into one string
  const merged = purged.map(r => r.css).join('\n');

  // 3. Minify with cssnano
  const result = await postcss([cssnano({ preset: 'default' })]).process(merged, { from: undefined });

  // Write merged+minified CSS
  await fs.ensureDir(path.join(DIST, 'css'));
  await fs.writeFile(path.join(DIST, 'css', 'style.css'), result.css);

  // 4. Also minify font-fallbacks.css (will be inlined by critical CSS step)
  const fallbacksSrc = await fs.readFile(path.join(SRC, 'css', 'font-fallbacks.css'), 'utf8');
  const fallbacksResult = await postcss([cssnano({ preset: 'default' })]).process(fallbacksSrc, { from: undefined });
  await fs.writeFile(path.join(DIST, 'css', 'font-fallbacks.css'), fallbacksResult.css);

  console.log('  ✓ CSS purged, merged, and minified');
};
