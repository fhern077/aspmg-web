const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');
const { DIST, SITE_PAGES } = require('../utils/config');

const CRITICAL_SELECTORS_BASE = [
  ':root', '*', 'html', 'body', 'img', 'a', 'h1', 'h2',
  '.container', '.d-flex', '.align-items-center', '.justify-content-between',
  '.gap-3', '.gap-4', '.text-white', '.text-decoration-none',
  '.py-2', '.py-3', '.d-none', '.sticky-top', '.bg-white',
  '.position-relative', '.display-3',
  '.text-accent', '.text-white-75', '.text-white-50',
  '.topbar', '.lang-toggle',
  '.navbar', '.navbar-brand', '.logo', '.brand-name',
  '.navbar-expand-lg', '.navbar-collapse', '.navbar-nav', '.nav-link',
  '.navbar-toggler', '.hamburger-line',
  '.nav-item', '.dropdown-menu',
];

const CRITICAL_SELECTORS_HOME = [...CRITICAL_SELECTORS_BASE, '.hero', '.hero-overlay', '.hero-pattern'];
const CRITICAL_SELECTORS_SUBPAGE = [...CRITICAL_SELECTORS_BASE, '.page-hero', '.page-hero-overlay'];

function selectorMatchesCritical(selector, criticalList) {
  const sel = selector.trim();
  for (const crit of criticalList) {
    if (sel === crit) return true;
    if (sel.startsWith(crit + ' ') || sel.startsWith(crit + '.') ||
        sel.startsWith(crit + ':') || sel.startsWith(crit + '>') ||
        sel.startsWith(crit + '~') || sel.startsWith(crit + '+')) return true;
    const escapedCrit = crit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[\\s>+~])${escapedCrit}(?:[\\s>+~:.\\[,]|$)`);
    if (regex.test(sel)) return true;
  }
  return false;
}

function extractCriticalRules(cssContent, criticalList) {
  const root = postcss.parse(cssContent);
  const criticalRoot = postcss.root();

  root.walk(node => {
    if (node.type === 'atrule' && node.name === 'media') {
      const mediaClone = postcss.atRule({ name: 'media', params: node.params });
      node.walkRules(rule => {
        const selectors = rule.selector.split(',');
        if (selectors.some(s => selectorMatchesCritical(s, criticalList))) {
          mediaClone.append(rule.clone());
        }
      });
      if (mediaClone.nodes && mediaClone.nodes.length > 0) criticalRoot.append(mediaClone);
    } else if (node.type === 'rule' && node.parent.type === 'root') {
      const selectors = node.selector.split(',');
      if (selectors.some(s => selectorMatchesCritical(s, criticalList))) {
        criticalRoot.append(node.clone());
      }
    }
  });

  return criticalRoot.toString();
}

module.exports = async function criticalCss() {
  const fontFallbacks = await fs.readFile(path.join(DIST, 'css', 'font-fallbacks.css'), 'utf8');
  const mainCss = await fs.readFile(path.join(DIST, 'css', 'style.css'), 'utf8');

  for (const page of SITE_PAGES) {
    const htmlPath = path.join(DIST, page);
    let html = await fs.readFile(htmlPath, 'utf8');

    const criticalList = page === 'index.html' ? CRITICAL_SELECTORS_HOME : CRITICAL_SELECTORS_SUBPAGE;
    const criticalCssRaw = extractCriticalRules(mainCss, criticalList);
    const minified = await postcss([cssnano({ preset: 'default' })]).process(
      fontFallbacks + criticalCssRaw, { from: undefined }
    );
    const inlineStyle = `<style>${minified.css}</style>`;

    html = html.replace(/<link rel="stylesheet" href="css\/font-fallbacks\.css">/, inlineStyle);
    html = html.replace(
      /<link rel="stylesheet" href="(css\/(?:style|boxicons\.min)\.css)">/g,
      '<link rel="stylesheet" href="$1" media="print" onload="this.media=\'all\'">'
    );
    const extras = '<link rel="preload" href="fonts/boxicons.woff2" as="font" type="font/woff2" crossorigin>' +
      '<noscript><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/boxicons.min.css"></noscript>';
    html = html.replace('</head>', `${extras}</head>`);

    await fs.writeFile(htmlPath, html);
  }

  await fs.remove(path.join(DIST, 'css', 'font-fallbacks.css'));
  console.log('  ✓ Critical CSS extracted and inlined');
};
