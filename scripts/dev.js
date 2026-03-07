#!/usr/bin/env node
const { execSync } = require('child_process');
const { watch } = require('fs');
const { resolve } = require('path');
const browserSync = require('browser-sync').create();

const srcDir = resolve(__dirname, '../src');
const distDir = resolve(__dirname, '../dist');

let building = false;
let queued = false;

function build() {
  if (building) { queued = true; return; }
  building = true;
  console.log('\nRebuilding...');
  try {
    execSync('node scripts/build.js', { cwd: resolve(__dirname, '..'), stdio: 'inherit' });
  } catch {
    console.error('Build failed.');
  }
  building = false;
  if (queued) { queued = false; build(); }
  else browserSync.reload();
}

build();

browserSync.init({
  server: distDir,
  open: true,
  notify: false,
});

watch(srcDir, { recursive: true }, (_event, filename) => {
  if (filename) console.log(`Changed: ${filename}`);
  build();
});

console.log(`Watching ${srcDir} for changes...`);
