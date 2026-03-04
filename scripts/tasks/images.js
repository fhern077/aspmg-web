const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');
const { SRC, DIST, SKIP_WEBP, RESPONSIVE_WIDTHS, RESPONSIVE_THRESHOLD } = require('../utils/config');
const { loadManifest, saveManifest, fileHash } = require('../utils/cache');

module.exports = async function images() {
  const manifest = loadManifest();
  const newManifest = {};
  const imgSrc = path.join(SRC, 'img');
  const imgDist = path.join(DIST, 'img');
  await fs.ensureDir(imgDist);

  // Find all source images (exclude favicon dir — copied separately)
  const files = await glob('*.{jpg,jpeg,png,webp,svg}', { cwd: imgSrc });

  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const srcPath = path.join(imgSrc, file);
    const hash = fileHash(srcPath);
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file, ext);

    // Always copy the original
    const destOriginal = path.join(imgDist, file);

    // Check cache
    if (manifest[file] === hash && await fs.pathExists(destOriginal)) {
      // Copy cached outputs
      newManifest[file] = hash;
      skipped++;
      continue;
    }

    // Copy original (SVGs and non-image files just get copied)
    if (ext === '.svg') {
      await fs.copy(srcPath, destOriginal);
      newManifest[file] = hash;
      processed++;
      continue;
    }

    // Optimize and copy original
    const stats = await fs.stat(srcPath);
    const isLarge = stats.size > RESPONSIVE_THRESHOLD;
    const skipWebp = SKIP_WEBP.includes(file);

    if (ext === '.jpg' || ext === '.jpeg') {
      // Optimize JPG
      await sharp(srcPath).jpeg({ quality: 80, mozjpeg: true }).toFile(destOriginal);
    } else if (ext === '.png') {
      // Optimize PNG
      await sharp(srcPath).png({ quality: 80, compressionLevel: 9 }).toFile(destOriginal);
    } else {
      await fs.copy(srcPath, destOriginal);
    }

    // Generate WebP variant at original size (unless skipped)
    if (!skipWebp && ext !== '.webp') {
      const webpDest = path.join(imgDist, `${basename}.webp`);
      await sharp(srcPath).webp({ quality: 75 }).toFile(webpDest);
    }

    // Generate responsive variants for large images
    if (isLarge && !skipWebp && ext !== '.svg' && ext !== '.webp') {
      const metadata = await sharp(srcPath).metadata();
      for (const width of RESPONSIVE_WIDTHS) {
        if (metadata.width && width < metadata.width) {
          // WebP variant at this width
          const webpResized = path.join(imgDist, `${basename}-${width}.webp`);
          await sharp(srcPath).resize(width).webp({ quality: 75 }).toFile(webpResized);
        }
      }
    }

    newManifest[file] = hash;
    processed++;
  }

  saveManifest(newManifest);
  console.log(`  ✓ Images: ${processed} processed, ${skipped} cached`);
};
