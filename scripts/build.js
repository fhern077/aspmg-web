#!/usr/bin/env node
const clean = require('./tasks/clean');
const copy = require('./tasks/copy');
const css = require('./tasks/css');
const js = require('./tasks/js');
const fonts = require('./tasks/fonts');
const images = require('./tasks/images');
const { transform, minifyHtml } = require('./tasks/html');
const criticalCss = require('./tasks/critical-css');
const seo = require('./tasks/seo');

async function build() {
  const start = Date.now();
  console.log('Building ASPMG site...\n');

  console.log('[1/6] Clean');
  await clean();

  console.log('\n[2/6] Process assets (parallel)');
  await Promise.all([copy(), css(), js(), fonts(), images()]);

  console.log('\n[3/6] HTML transform');
  await transform();

  console.log('\n[4/6] Critical CSS');
  await criticalCss();

  console.log('\n[5/6] HTML minify');
  await minifyHtml();

  console.log('\n[6/6] SEO validation');
  await seo();

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n✓ Build complete in ${elapsed}s`);
}

build().catch(err => {
  console.error('\n✗ Build failed:', err.message || err);
  process.exit(1);
});
