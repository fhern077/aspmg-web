const fs = require('fs-extra');
const path = require('path');
const { minify } = require('terser');
const { SRC, DIST } = require('../utils/config');

module.exports = async function js() {
  await fs.ensureDir(path.join(DIST, 'js'));

  for (const file of ['main.js', 'i18n.js']) {
    const src = await fs.readFile(path.join(SRC, 'js', file), 'utf8');
    const result = await minify(src, {
      compress: { drop_console: false, passes: 2 },
      mangle: true,
    });
    await fs.writeFile(path.join(DIST, 'js', file), result.code);
  }

  console.log('  ✓ JS minified');
};
