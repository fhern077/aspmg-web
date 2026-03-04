const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');
const { minify } = require('html-minifier-terser');
const { SRC, DIST, SITE_PAGES, SKIP_WEBP } = require('../utils/config');

const MINIFY_OPTS = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  sortAttributes: true,
  sortClassName: true,
};

// Build a <picture> element wrapping an <img> tag
function wrapInPicture(imgTag, imgSrc) {
  const ext = path.extname(imgSrc).toLowerCase();
  const basename = path.basename(imgSrc, ext);
  const dir = path.dirname(imgSrc);

  // Determine available WebP variants by checking what the image build generated
  const webpOriginal = `${dir}/${basename}.webp`;

  // Check if this image has responsive variants (large images get 400w/700w)
  // We detect by checking if the image src is in img/ directory and is a jpg/png
  const isResponsive = (ext === '.jpg' || ext === '.jpeg' || ext === '.png');

  // Check if responsive variants exist in dist
  const distImgDir = path.join(DIST, dir);
  const has400 = isResponsive && fs.existsSync(path.join(DIST, `${dir}/${basename}-400.webp`));
  const has700 = isResponsive && fs.existsSync(path.join(DIST, `${dir}/${basename}-700.webp`));

  let sources = '';
  if (has400 && has700) {
    sources = `<source type="image/webp" srcset="${dir}/${basename}-400.webp 400w, ${dir}/${basename}-700.webp 700w, ${webpOriginal}" sizes="(max-width: 600px) 400px, (max-width: 900px) 700px, 100vw">`;
  } else if (fs.existsSync(path.join(DIST, webpOriginal))) {
    sources = `<source type="image/webp" srcset="${webpOriginal}">`;
  }

  if (!sources) return imgTag; // No WebP available, return original

  return `<picture>${sources}${imgTag}</picture>`;
}

module.exports = async function html() {
  // Process main site pages
  for (const page of SITE_PAGES) {
    let content = await fs.readFile(path.join(SRC, page), 'utf8');

    // Update CSS links: the build merges base.css+style.css into style.css
    // Replace separate base.css + style.css links with single style.css
    content = content.replace(
      /\s*<link rel="stylesheet" href="css\/font-fallbacks\.css">\s*\n\s*<link rel="stylesheet" href="css\/base\.css">\s*\n\s*<link rel="stylesheet" href="css\/boxicons\.min\.css">\s*\n\s*<link rel="stylesheet" href="css\/style\.css">/,
      '\n    <link rel="stylesheet" href="css/font-fallbacks.css">\n    <link rel="stylesheet" href="css/style.css">\n    <link rel="stylesheet" href="css/boxicons.min.css">'
    );

    // Wrap <img> tags in <picture> with WebP sources
    // Skip: images already in <picture>, SVG images, external URLs, OG images
    content = content.replace(/<img\s[^>]*src="([^"]+)"[^>]*>/g, (match, src) => {
      // Skip external URLs
      if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) return match;
      // Skip SVGs
      if (src.endsWith('.svg')) return match;
      // Skip OG/social images
      if (SKIP_WEBP.some(skip => src.includes(skip))) return match;
      // Skip if already wrapped in <picture>
      // (We can't easily check in regex, handled below)
      return wrapInPicture(match, src);
    });

    // Clean up double-wrapped pictures (in case source already had <picture>)
    content = content.replace(/<picture><picture>/g, '<picture>');
    content = content.replace(/<\/picture><\/picture>/g, '</picture>');

    // Minify
    const minified = await minify(content, MINIFY_OPTS);
    await fs.writeFile(path.join(DIST, page), minified);
  }

  // Process template HTML pages (minify only)
  const templateHtmlFiles = await glob('templates/**/*.html', { cwd: SRC });
  for (const tpl of templateHtmlFiles) {
    const content = await fs.readFile(path.join(SRC, tpl), 'utf8');
    const minified = await minify(content, MINIFY_OPTS);
    await fs.ensureDir(path.join(DIST, path.dirname(tpl)));
    await fs.writeFile(path.join(DIST, tpl), minified);
  }

  console.log(`  ✓ HTML processed and minified (${SITE_PAGES.length} pages + templates)`);
};
