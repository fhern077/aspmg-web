const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');
const { SRC, DIST } = require('../utils/config');

module.exports = async function fonts() {
  await fs.ensureDir(path.join(DIST, 'fonts'));

  // Copy only woff2 and woff (drop eot, svg, ttf to save ~1.7MB)
  for (const ext of ['woff2', 'woff']) {
    const src = path.join(SRC, 'fonts', `boxicons.${ext}`);
    if (await fs.pathExists(src)) {
      await fs.copy(src, path.join(DIST, 'fonts', `boxicons.${ext}`));
    }
  }

  // Rewrite boxicons.min.css to only reference woff2 and woff
  const originalCss = await fs.readFile(path.join(SRC, 'css', 'boxicons.min.css'), 'utf8');

  // Replace the @font-face src to only include woff2 and woff
  const rewritten = originalCss.replace(
    /@font-face\{[^}]*\}/,
    (match) => {
      return match.replace(
        /src:[^;]+;/,
        "src:url(../fonts/boxicons.woff2) format('woff2'),url(../fonts/boxicons.woff) format('woff');"
      );
    }
  );

  // Minify
  const result = await postcss([cssnano({ preset: 'default' })]).process(rewritten, { from: undefined });
  await fs.ensureDir(path.join(DIST, 'css'));
  await fs.writeFile(path.join(DIST, 'css', 'boxicons.min.css'), result.css);

  console.log('  ✓ Fonts copied (woff2+woff only), boxicons CSS rewritten');
};
