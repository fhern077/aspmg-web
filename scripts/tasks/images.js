const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');
const { SRC, DIST, SKIP_WEBP, RESPONSIVE_WIDTHS, RESPONSIVE_THRESHOLD } = require('../utils/config');
const { loadManifest, saveManifest, fileHash, CACHE_DIR } = require('../utils/cache');

const IMG_CACHE = path.join(CACHE_DIR, 'images');

module.exports = async function images() {
  const manifest = loadManifest();
  const newManifest = {};
  const imgSrc = path.join(SRC, 'img');
  const imgDist = path.join(DIST, 'img');
  await fs.ensureDir(imgDist);
  await fs.ensureDir(IMG_CACHE);

  const files = await glob('*.{jpg,jpeg,png,webp,svg}', { cwd: imgSrc });
  let processed = 0;
  let cached = 0;

  for (const file of files) {
    const srcPath = path.join(imgSrc, file);
    const hash = fileHash(srcPath);
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file, ext);
    const cachedDir = path.join(IMG_CACHE, `${basename}-${hash}`);

    if (manifest[file] === hash && await fs.pathExists(cachedDir)) {
      const cachedFiles = await fs.readdir(cachedDir);
      for (const cf of cachedFiles) {
        await fs.copy(path.join(cachedDir, cf), path.join(imgDist, cf));
      }
      newManifest[file] = hash;
      cached++;
      continue;
    }

    await fs.ensureDir(cachedDir);

    if (ext === '.svg') {
      await fs.copy(srcPath, path.join(imgDist, file));
      await fs.copy(srcPath, path.join(cachedDir, file));
      newManifest[file] = hash;
      processed++;
      continue;
    }

    const stats = await fs.stat(srcPath);
    const isLarge = stats.size > RESPONSIVE_THRESHOLD;
    const skipWebp = SKIP_WEBP.includes(file);

    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(srcPath).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(imgDist, file));
    } else if (ext === '.png') {
      await sharp(srcPath).png({ quality: 80, compressionLevel: 9 }).toFile(path.join(imgDist, file));
    } else {
      await fs.copy(srcPath, path.join(imgDist, file));
    }
    await fs.copy(path.join(imgDist, file), path.join(cachedDir, file));

    if (!skipWebp && ext !== '.webp') {
      const webpName = `${basename}.webp`;
      await sharp(srcPath).webp({ quality: 75 }).toFile(path.join(imgDist, webpName));
      await fs.copy(path.join(imgDist, webpName), path.join(cachedDir, webpName));
    }

    if (isLarge && !skipWebp && ext !== '.svg' && ext !== '.webp') {
      const metadata = await sharp(srcPath).metadata();
      for (const width of RESPONSIVE_WIDTHS) {
        if (metadata.width && width < metadata.width) {
          const webpName = `${basename}-${width}.webp`;
          await sharp(srcPath).resize(width).webp({ quality: 75 }).toFile(path.join(imgDist, webpName));
          await fs.copy(path.join(imgDist, webpName), path.join(cachedDir, webpName));
        }
      }
    }

    newManifest[file] = hash;
    processed++;
  }

  saveManifest(newManifest);
  console.log(`  ✓ Images: ${processed} processed, ${cached} cached`);
};
