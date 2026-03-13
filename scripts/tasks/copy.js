const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');
const { SRC, DIST } = require('../utils/config');

module.exports = async function copy() {
  // Static files at root level
  const rootFiles = ['CNAME', 'robots.txt', 'sitemap.xml', 'favicon.ico'];
  for (const f of rootFiles) {
    const src = path.join(SRC, f);
    if (await fs.pathExists(src)) {
      await fs.copy(src, path.join(DIST, f));
    }
  }

  // Docs directory
  await fs.copy(path.join(SRC, 'docs'), path.join(DIST, 'docs'));

  // Favicon PNGs
  await fs.copy(path.join(SRC, 'img', 'favicon'), path.join(DIST, 'img', 'favicon'));

  // Templates: docx, xlsx, png files + HTML pages (HTML handled separately in html.js)
  const templateAssets = await glob('templates/**/*.{docx,xlsx,png,jpg,jpeg}', { cwd: SRC });
  for (const f of templateAssets) {
    await fs.copy(path.join(SRC, f), path.join(DIST, f));
  }

  console.log('  ✓ Copied static assets');
};
