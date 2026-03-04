const fs = require('fs-extra');
const { DIST } = require('../utils/config');

module.exports = async function clean() {
  await fs.remove(DIST);
  console.log('  ✓ Cleaned dist/');
};
