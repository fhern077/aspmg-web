const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const { CACHE_DIR } = require('./config');

const MANIFEST_PATH = path.join(CACHE_DIR, 'manifest.json');

function loadManifest() {
  try {
    return fs.readJsonSync(MANIFEST_PATH);
  } catch {
    return {};
  }
}

function saveManifest(manifest) {
  fs.ensureDirSync(CACHE_DIR);
  fs.writeJsonSync(MANIFEST_PATH, manifest, { spaces: 2 });
}

function fileHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(buf).digest('hex');
}

module.exports = { loadManifest, saveManifest, fileHash, CACHE_DIR };
