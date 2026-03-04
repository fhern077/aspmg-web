const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const CACHE_DIR = path.join(__dirname, '..', '.cache');

const PURGECSS_SAFELIST = {
  standard: ['show', 'collapsed', 'navbar-scrolled', 'fade-in-visible', 'visible', 'active', 'alert-success', 'alert-danger'],
  greedy: [/lang-/, /i18n/],
};

// Images that should NOT be converted to WebP (OG/social images)
const SKIP_WEBP = ['og-image.jpg', 'og-logo.png'];

// Main site HTML pages (get full build treatment including critical CSS)
const SITE_PAGES = ['index.html', 'documents.html', 'payments.html'];

// Template HTML pages (minify only, no critical CSS)
const TEMPLATE_HTML_GLOB = 'templates/**/*.html';

// Image widths for responsive variants (only for images > threshold)
const RESPONSIVE_WIDTHS = [400, 700];
const RESPONSIVE_THRESHOLD = 100 * 1024; // 100KB — only large images get responsive variants

module.exports = { ROOT, SRC, DIST, CACHE_DIR, PURGECSS_SAFELIST, SKIP_WEBP, SITE_PAGES, TEMPLATE_HTML_GLOB, RESPONSIVE_WIDTHS, RESPONSIVE_THRESHOLD };
