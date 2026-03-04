const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const { DIST, SITE_PAGES } = require('../utils/config');

module.exports = async function seo() {
  const errors = [];
  const warnings = [];

  // Load and validate sitemap
  const sitemapPath = path.join(DIST, 'sitemap.xml');
  let sitemapUrls = [];
  if (await fs.pathExists(sitemapPath)) {
    const sitemap = await fs.readFile(sitemapPath, 'utf8');
    const matches = sitemap.match(/<loc>([^<]+)<\/loc>/g) || [];
    sitemapUrls = matches.map(m => m.replace(/<\/?loc>/g, ''));
  } else {
    errors.push('sitemap.xml not found in dist/');
  }

  for (const page of SITE_PAGES) {
    const htmlPath = path.join(DIST, page);
    if (!await fs.pathExists(htmlPath)) {
      errors.push(`${page}: file not found`);
      continue;
    }

    const html = await fs.readFile(htmlPath, 'utf8');
    const $ = cheerio.load(html);

    // Check title
    const title = $('title').text().trim();
    if (!title) errors.push(`${page}: missing <title>`);
    else if (title.length > 70) warnings.push(`${page}: title is ${title.length} chars (recommended max 60-70)`);

    // Check meta description
    const desc = $('meta[name="description"]').attr('content');
    if (!desc) errors.push(`${page}: missing meta description`);
    else if (desc.length > 160) warnings.push(`${page}: description is ${desc.length} chars (recommended max 155-160)`);

    // Check OG tags
    if (!$('meta[property="og:title"]').attr('content')) errors.push(`${page}: missing og:title`);
    if (!$('meta[property="og:description"]').attr('content')) errors.push(`${page}: missing og:description`);
    if (!$('meta[property="og:image"]').attr('content')) errors.push(`${page}: missing og:image`);
    if (!$('meta[property="og:url"]').attr('content')) errors.push(`${page}: missing og:url`);

    // Check alt attributes on images
    $('img').each((_, el) => {
      const alt = $(el).attr('alt');
      if (!alt) {
        const src = $(el).attr('src') || 'unknown';
        warnings.push(`${page}: img missing alt attribute (${src})`);
      }
    });

    // Check structured data (JSON-LD)
    const jsonLd = $('script[type="application/ld+json"]');
    if (jsonLd.length === 0 && page === 'index.html') {
      warnings.push(`${page}: no structured data (JSON-LD) found`);
    }

    // Check sitemap consistency
    const canonical = $('link[rel="canonical"]').attr('href');
    if (canonical && sitemapUrls.length > 0) {
      if (!sitemapUrls.includes(canonical)) {
        warnings.push(`${page}: canonical URL "${canonical}" not found in sitemap.xml`);
      }
    }
  }

  // Report
  if (errors.length > 0) {
    console.log('  ✗ SEO errors:');
    errors.forEach(e => console.log(`    ✗ ${e}`));
  }
  if (warnings.length > 0) {
    console.log('  ⚠ SEO warnings:');
    warnings.forEach(w => console.log(`    ⚠ ${w}`));
  }
  if (errors.length === 0 && warnings.length === 0) {
    console.log('  ✓ SEO validation passed — all checks OK');
  } else if (errors.length === 0) {
    console.log(`  ✓ SEO validation passed (${warnings.length} warnings)`);
  }

  if (errors.length > 0) {
    throw new Error(`SEO validation failed with ${errors.length} error(s)`);
  }
};
