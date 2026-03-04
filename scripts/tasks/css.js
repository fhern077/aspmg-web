const fs = require('fs-extra');
const path = require('path');
const { PurgeCSS } = require('purgecss');
const postcss = require('postcss');
const cssnano = require('cssnano');
const { SRC, DIST, PURGECSS_SAFELIST } = require('../utils/config');

module.exports = async function css() {
  // 1. Read self-hosted font declarations from all.css (first section before base/boxicons/style)
  const allCss = await fs.readFile(path.join(SRC, 'css', 'all.css'), 'utf8');

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

  // 3. Read boxicons CSS
  const boxicons = await fs.readFile(path.join(SRC, 'css', 'boxicons.min.css'), 'utf8');

  // 4. Font fallback declarations
  const fontFallbacks =
    '@font-face{font-family:\'DM Serif Display Fallback\';src:local(\'Georgia\');size-adjust:105%;ascent-override:90%;descent-override:25%;line-gap-override:0%}' +
    '@font-face{font-family:\'Sora Fallback\';src:local(\'Arial\');size-adjust:100%;ascent-override:95%;descent-override:25%;line-gap-override:0%}';

  // 5. Merge: Google fonts + fallbacks + boxicons + purged base+style
  const merged = allCss + '\n' + fontFallbacks + '\n' + boxicons + '\n' + purged.map(r => r.css).join('\n');

  // 6. Minify with cssnano
  const result = await postcss([cssnano({ preset: 'default' })]).process(merged, { from: undefined });

  // Write as all.css
  await fs.ensureDir(path.join(DIST, 'css'));
  await fs.writeFile(path.join(DIST, 'css', 'all.css'), result.css);

  console.log('  ✓ CSS purged, merged (fonts + boxicons + base + style) into all.css, and minified');
};
