#!/usr/bin/env node
const clean = require('./tasks/clean');
const copy = require('./tasks/copy');
const css = require('./tasks/css');
const js = require('./tasks/js');
const fonts = require('./tasks/fonts');
const images = require('./tasks/images');
const html = require('./tasks/html');
const criticalCss = require('./tasks/critical-css');
const seo = require('./tasks/seo');

async function build() {
  const start = Date.now();
  console.log('Building ASPMG site...\n');

  // Step 1: Clean
  console.log('[1/5] Clean');
  await clean();

  // Step 2: Parallel tasks
  console.log('\n[2/5] Process assets (parallel)');
  await Promise.all([
    copy(),
    css(),
    js(),
    fonts(),
    images(),
  ]);

  // Step 3: HTML (depends on CSS + images being done for <picture> tags and CSS link rewrites)
  console.log('\n[3/5] HTML');
  await html();

  // Step 4: Critical CSS (depends on HTML being in dist/)
  console.log('\n[4/5] Critical CSS');
  await criticalCss();

  // Step 5: SEO validation
  console.log('\n[5/5] SEO validation');
  await seo();

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n✓ Build complete in ${elapsed}s`);
}

build().catch(err => {
  console.error('\n✗ Build failed:', err.message || err);
  process.exit(1);
});
