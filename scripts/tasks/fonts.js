const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');
const { SRC, DIST } = require('../utils/config');

module.exports = async function fonts() {
  await fs.ensureDir(path.join(DIST, 'fonts'));

  // Copy all woff2 and woff fonts (boxicons + self-hosted Google Fonts)
  const fontFiles = await glob('*.{woff2,woff}', { cwd: path.join(SRC, 'fonts') });
  for (const file of fontFiles) {
    await fs.copy(path.join(SRC, 'fonts', file), path.join(DIST, 'fonts', file));
  }

  console.log(`  ✓ Fonts copied (${fontFiles.length} files: woff2+woff)`);
};
