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
};

function wrapInPicture(imgTag, imgSrc) {
  const ext = path.extname(imgSrc).toLowerCase();
  const basename = path.basename(imgSrc, ext);
  const dir = path.dirname(imgSrc);
  const webpOriginal = `${dir}/${basename}.webp`;

  const has400 = fs.existsSync(path.join(DIST, `${dir}/${basename}-400.webp`));
  const has700 = fs.existsSync(path.join(DIST, `${dir}/${basename}-700.webp`));

  let sources = '';
  if (has400 && has700) {
    sources = `<source type="image/webp" srcset="${dir}/${basename}-400.webp 400w, ${dir}/${basename}-700.webp 700w, ${webpOriginal}" sizes="(max-width: 600px) 400px, (max-width: 900px) 700px, 100vw">`;
  } else if (fs.existsSync(path.join(DIST, webpOriginal))) {
    sources = `<source type="image/webp" srcset="${webpOriginal}">`;
  }

  if (!sources) return imgTag;
  return `<picture>${sources}${imgTag}</picture>`;
}

async function transform() {
  for (const page of SITE_PAGES) {
    let content = await fs.readFile(path.join(SRC, page), 'utf8');

    content = content.replace(
      /\s*<link rel="stylesheet" href="css\/font-fallbacks\.css">\s*\n\s*<link rel="stylesheet" href="css\/base\.css">\s*\n\s*<link rel="stylesheet" href="css\/boxicons\.min\.css">\s*\n\s*<link rel="stylesheet" href="css\/style\.css">/,
      '\n    <link rel="stylesheet" href="css/style.css">\n    <link rel="stylesheet" href="css/boxicons.min.css">'
    );

    content = content.replace(/<img\s[^>]*src="([^"]+)"[^>]*>/g, (match, src) => {
      if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) return match;
      if (src.endsWith('.svg')) return match;
      if (SKIP_WEBP.some(skip => src.includes(skip))) return match;
      return wrapInPicture(match, src);
    });

    content = content.replace(/<picture><picture>/g, '<picture>');
    content = content.replace(/<\/picture><\/picture>/g, '</picture>');

    await fs.writeFile(path.join(DIST, page), content);
  }

  const templateHtmlFiles = await glob('templates/**/*.html', { cwd: SRC });
  for (const tpl of templateHtmlFiles) {
    const content = await fs.readFile(path.join(SRC, tpl), 'utf8');
    await fs.ensureDir(path.join(DIST, path.dirname(tpl)));
    await fs.writeFile(path.join(DIST, tpl), content);
  }

  console.log(`  ✓ HTML transformed (${SITE_PAGES.length} pages + templates)`);
}

async function minifyHtml() {
  for (const page of SITE_PAGES) {
    const htmlPath = path.join(DIST, page);
    const content = await fs.readFile(htmlPath, 'utf8');
    const minified = await minify(content, MINIFY_OPTS);
    await fs.writeFile(htmlPath, minified);
  }

  const templateHtmlFiles = await glob('templates/**/*.html', { cwd: DIST });
  for (const tpl of templateHtmlFiles) {
    const htmlPath = path.join(DIST, tpl);
    const content = await fs.readFile(htmlPath, 'utf8');
    const minified = await minify(content, MINIFY_OPTS);
    await fs.writeFile(htmlPath, minified);
  }

  console.log('  ✓ HTML minified');
}

module.exports = { transform, minifyHtml };
