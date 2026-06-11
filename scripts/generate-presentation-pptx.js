/**
 * Generates the generic ASPMG management proposal as a PowerPoint deck.
 * Output: src/templates/aspmg-presentation/ASPMG-Presentation.pptx
 *
 * Usage: node scripts/generate-presentation-pptx.js
 */
const path = require('path');
const PptxGenJS = require('pptxgenjs');

const IMG = (f) => path.join(__dirname, '..', 'src', 'templates', 'aspmg-presentation', 'img', f);
const OUT = path.join(__dirname, '..', 'src', 'templates', 'aspmg-presentation', 'ASPMG-Presentation.pptx');

// ASPMG design tokens
const PRIMARY = '1B2A4A';
const PRIMARY_DARK = '0F1A32';
const ACCENT = 'A89060';
const ACCENT_LIGHT = 'BDA87A';
const ACCENT_DARK = '8D764D';
const DARK = '1A1E2C';
const BODY = '5A6275';
const BODY_LIGHT = '6B7590';
const LIGHT_BG = 'F4F6FA';
const WHITE = 'FFFFFF';
const SUCCESS = '2E7D5B';
const SUCCESS_LIGHT = 'E8F5EE';

const HEAD = 'Georgia';   // serif heading (DM Serif Display stand-in)
const SANS = 'Calibri';   // body (Sora stand-in)

const W = 13.33, H = 7.5;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'WIDE', width: W, height: H });
pptx.layout = 'WIDE';
pptx.author = 'A Solid Property Management Group';
pptx.company = 'ASPMG';
pptx.title = 'ASPMG — Management Proposal';

function goldBar(s, x, y, w = 0.8) {
  s.addShape('rect', { x, y, w, h: 0.045, fill: { color: ACCENT }, line: { type: 'none' } });
}

function footer(s, label, dark = false) {
  s.addImage({ path: IMG('logo.png'), x: 0.55, y: H - 0.52, w: 0.34, h: 0.3, transparency: dark ? 60 : 40 });
  s.addText(label, {
    x: W - 5.0, y: H - 0.55, w: 4.45, h: 0.3, align: 'right',
    fontFace: SANS, fontSize: 9, color: dark ? '5A6FA0' : 'AAB2C4',
  });
}

function sectionDivider(num, title, desc) {
  const s = pptx.addSlide();
  s.background = { color: PRIMARY_DARK };
  s.addText(num, { x: 0.8, y: 1.1, w: 4, h: 1.6, fontFace: HEAD, fontSize: 80, color: '32405F', bold: true });
  s.addText(title, { x: 0.85, y: 2.6, w: 11.5, h: 1.1, fontFace: HEAD, fontSize: 44, color: WHITE, bold: true });
  goldBar(s, 0.9, 3.75);
  s.addText(desc, { x: 0.9, y: 4.0, w: 8.5, h: 1.4, fontFace: SANS, fontSize: 16, color: 'C9D0DE' });
  return s;
}

function statCard(s, x, y, w, h, number, label, opts = {}) {
  const dark = !!opts.dark;
  s.addShape('roundRect', {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: dark ? '263656' : WHITE },
    line: dark ? { color: '36476B', width: 0.75 } : { type: 'none' },
    shadow: dark ? undefined : { type: 'outer', color: PRIMARY, opacity: 0.12, blur: 8, offset: 2, angle: 90 },
  });
  s.addText(number, {
    x, y: y + h * 0.12, w, h: h * 0.5, align: 'center',
    fontFace: HEAD, fontSize: opts.numSize || 30, color: dark ? ACCENT_LIGHT : ACCENT, bold: true,
  });
  s.addText(label.toUpperCase(), {
    x: x + 0.1, y: y + h * 0.58, w: w - 0.2, h: h * 0.38, align: 'center', valign: 'top',
    fontFace: SANS, fontSize: opts.labelSize || 10, color: dark ? 'A8B2C8' : BODY_LIGHT, charSpacing: 2,
  });
}

function badge(s, x, y, w, text, opts = {}) {
  s.addShape('roundRect', {
    x, y, w, h: 0.32, rectRadius: 0.16,
    fill: { color: opts.fill || 'EFE9DC' }, line: { type: 'none' },
  });
  s.addText(text.toUpperCase(), {
    x, y, w, h: 0.32, align: 'center', valign: 'middle',
    fontFace: SANS, fontSize: 9, bold: true, color: opts.color || ACCENT_DARK, charSpacing: 1.5,
  });
}

function featureCard(s, x, y, w, h, title, body) {
  s.addShape('roundRect', {
    x, y, w, h, rectRadius: 0.08, fill: { color: WHITE },
    line: { type: 'none' },
    shadow: { type: 'outer', color: PRIMARY, opacity: 0.1, blur: 6, offset: 2, angle: 90 },
  });
  s.addShape('rect', { x, y, w: 0.045, h, fill: { color: ACCENT }, line: { type: 'none' } });
  s.addText(title, { x: x + 0.18, y: y + 0.1, w: w - 0.3, h: 0.35, fontFace: SANS, fontSize: 12, bold: true, color: DARK });
  s.addText(body, { x: x + 0.18, y: y + 0.42, w: w - 0.3, h: h - 0.52, fontFace: SANS, fontSize: 10, color: BODY_LIGHT, valign: 'top' });
}

// ============ SLIDE 1: TITLE ============
{
  const s = pptx.addSlide();
  s.background = { color: PRIMARY_DARK };
  s.addImage({ path: IMG('logo.png'), x: W / 2 - 0.95, y: 0.75, w: 1.9, h: 1.7 });
  s.addText('A SOLID PROPERTY MANAGEMENT GROUP', {
    x: 0, y: 2.6, w: W, h: 0.45, align: 'center',
    fontFace: SANS, fontSize: 16, color: '9AA5BC', charSpacing: 4,
  });
  goldBar(s, W / 2 - 0.5, 3.25, 1.0);
  s.addText('PREPARED EXCLUSIVELY FOR', {
    x: 0, y: 3.6, w: W, h: 0.35, align: 'center',
    fontFace: SANS, fontSize: 11, color: '6E7A95', charSpacing: 3,
  });
  s.addText('Your Community Association', {
    x: 0, y: 3.95, w: W, h: 1.0, align: 'center',
    fontFace: HEAD, fontSize: 40, color: ACCENT_LIGHT, bold: true,
  });
  s.addText('A SOLID PROPERTY MANAGEMENT GROUP  •  MIAMI, FLORIDA', {
    x: 0, y: 6.3, w: W, h: 0.35, align: 'center',
    fontFace: SANS, fontSize: 10, color: '566181', charSpacing: 2,
  });
}

// ============ SLIDE 2: WHO WE ARE ============
sectionDivider('01', 'Who We Are',
  "A full-service property management firm built on transparency, technology, and financial excellence for South Florida's condominium associations.");

// ============ SLIDE 3: AT A GLANCE ============
{
  const s = pptx.addSlide();
  s.background = { color: LIGHT_BG };
  badge(s, W / 2 - 1.1, 0.5, 2.2, 'Company Overview');
  s.addText('ASPMG at a Glance', { x: 0, y: 0.9, w: W, h: 0.8, align: 'center', fontFace: HEAD, fontSize: 32, color: PRIMARY, bold: true });
  goldBar(s, W / 2 - 0.4, 1.75);

  const stats = [['15+', 'Years of Experience'], ['30+', 'Associations Managed'], ['$50M+', 'Assets Under Management'], ['100%', 'Board Transparency']];
  const cw = 2.7, gap = 0.35, total = cw * 4 + gap * 3, x0 = (W - total) / 2;
  stats.forEach(([n, l], i) => statCard(s, x0 + i * (cw + gap), 2.3, cw, 1.7, n, l));

  s.addShape('rect', { x: 1.6, y: 4.6, w: 0.05, h: 1.5, fill: { color: ACCENT }, line: { type: 'none' } });
  s.addText('"We don\'t just manage properties — we transform communities through proactive financial stewardship, cutting-edge technology, and relentless attention to detail."', {
    x: 1.85, y: 4.6, w: 9.8, h: 1.5, fontFace: HEAD, fontSize: 15, italic: true, color: PRIMARY, valign: 'middle',
  });
  footer(s, '85 Grand Canal Dr, Suite 201  •  Miami, FL 33144');
}

// ============ SLIDE 4: THE ASPMG DIFFERENCE ============
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  badge(s, 0.7, 0.45, 2.0, 'What Sets Us Apart', { fill: 'E6E9F0', color: PRIMARY });
  s.addText('The ASPMG Difference', { x: 0.7, y: 0.85, w: 9, h: 0.7, fontFace: HEAD, fontSize: 30, color: PRIMARY, bold: true });
  goldBar(s, 0.72, 1.6);

  const items = [
    ['Financial Stewardship', 'Growing reserves, eliminating debt, and saving over $200K on insurance — same coverage.'],
    ['Technology-Driven', 'ApplyHOA delivers real-time reporting, owner portals, and digital management.'],
    ['Radical Transparency', 'Photo inspection reports, itemized financials, and open-book project management.'],
    ['Project Management', 'Roof to pool — end-to-end capital projects with before/after documentation.'],
    ['Proactive Inspections', '20+ page photo reports catch issues early and track every resolution.'],
    ['Bilingual Team', 'Full English/Spanish staff for clear communication with every resident.'],
  ];
  const cw = 3.85, ch = 1.55, gx = 0.3, gy = 0.3, x0 = 0.7, y0 = 2.0;
  items.forEach(([t, b], i) => {
    featureCard(s, x0 + (i % 3) * (cw + gx), y0 + Math.floor(i / 3) * (ch + gy), cw, ch, t, b);
  });
  footer(s, 'aspmg.com');
}

// ============ SLIDE 5: TECHNOLOGY DIVIDER ============
sectionDivider('02', 'Technology & Innovation',
  'Powered by ApplyHOA — our proprietary platform that brings condominium management into the digital age.');

// ============ SLIDE 6: APPLYHOA ============
{
  const s = pptx.addSlide();
  s.background = { color: LIGHT_BG };
  badge(s, 0.7, 0.5, 2.3, 'Powered by ApplyHOA');
  s.addText('Smart Management, Real-Time Control', { x: 0.7, y: 0.9, w: 6.6, h: 1.1, fontFace: HEAD, fontSize: 26, color: PRIMARY, bold: true });
  goldBar(s, 0.72, 2.05);
  s.addText('Our proprietary platform built for Florida condo associations — replacing outdated paper processes with a fully digital ecosystem.', {
    x: 0.7, y: 2.25, w: 6.3, h: 0.8, fontFace: SANS, fontSize: 12, color: BODY,
  });

  const feats = [
    ['Owner Portal', 'Payments, requests, and documents 24/7'],
    ['Board Dashboard', 'Real-time financials, violations, project status'],
    ['Digital Voting', 'Secure online elections and amendments'],
    ['Maintenance Tracking', 'Every work order logged and resolved'],
    ['Document Library', 'Bylaws, budgets, minutes — all searchable'],
  ];
  feats.forEach(([t, b], i) => {
    const y = 3.2 + i * 0.62;
    s.addShape('ellipse', { x: 0.75, y: y + 0.1, w: 0.12, h: 0.12, fill: { color: ACCENT }, line: { type: 'none' } });
    s.addText([
      { text: t + ' — ', options: { bold: true, color: PRIMARY } },
      { text: b, options: { color: BODY } },
    ], { x: 1.0, y, w: 6.0, h: 0.55, fontFace: SANS, fontSize: 12 });
  });

  s.addShape('roundRect', { x: 7.5, y: 1.4, w: 5.1, h: 5.0, rectRadius: 0.15, fill: { color: PRIMARY }, line: { type: 'none' } });
  s.addText('Everything in One Platform', { x: 7.5, y: 2.0, w: 5.1, h: 0.5, align: 'center', fontFace: SANS, fontSize: 17, bold: true, color: WHITE });
  s.addText('Any device, anywhere, anytime.', { x: 7.5, y: 2.5, w: 5.1, h: 0.4, align: 'center', fontFace: SANS, fontSize: 11, color: 'A8B2C8' });
  const tags = ['Payments', 'Reports', 'Violations', 'Requests', 'Voting', 'Documents'];
  tags.forEach((t, i) => {
    const x = 7.95 + (i % 3) * 1.45, y = 3.3 + Math.floor(i / 3) * 0.55;
    s.addShape('roundRect', { x, y, w: 1.3, h: 0.38, rectRadius: 0.19, fill: { color: '3A4A6E' }, line: { type: 'none' } });
    s.addText(t.toUpperCase(), { x, y, w: 1.3, h: 0.38, align: 'center', valign: 'middle', fontFace: SANS, fontSize: 8, bold: true, color: ACCENT_LIGHT, charSpacing: 1 });
  });
  s.addText('applyhoa.com', { x: 7.5, y: 5.5, w: 5.1, h: 0.4, align: 'center', fontFace: SANS, fontSize: 11, color: ACCENT_LIGHT });
  footer(s, 'applyhoa.com');
}

// ============ SLIDE 7: FINANCIAL DIVIDER ============
sectionDivider('03', 'Financial Excellence',
  'Real numbers. Real results. See how ASPMG transforms the financial health of the associations we manage.');

// ============ SLIDE 8: MONEY EFFECT ============
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  badge(s, 0.7, 0.45, 1.5, 'Case Study', { fill: SUCCESS_LIGHT, color: SUCCESS });
  s.addText('The Money Effect', { x: 0.7, y: 0.85, w: 6.5, h: 0.6, fontFace: HEAD, fontSize: 26, color: PRIMARY, bold: true });
  s.addText('Doral Grand Condominium', { x: 0.7, y: 1.45, w: 6.5, h: 0.35, fontFace: SANS, fontSize: 13, bold: true, color: ACCENT });
  goldBar(s, 0.72, 1.9);
  s.addText("Under ASPMG management, Doral Grand's total assets more than doubled in just two years — with properly categorized reserves and dramatically reduced receivables.", {
    x: 0.7, y: 2.1, w: 6.3, h: 0.9, fontFace: SANS, fontSize: 11.5, color: BODY,
  });

  const rows = [
    [{ text: 'Metric', options: { bold: true, color: WHITE, fill: { color: PRIMARY } } },
     { text: 'Mar 2024', options: { bold: true, color: WHITE, fill: { color: PRIMARY } } },
     { text: 'Mar 2026', options: { bold: true, color: WHITE, fill: { color: PRIMARY } } },
     { text: 'Change', options: { bold: true, color: WHITE, fill: { color: PRIMARY } } }],
    ['Total Assets', '$63,128', '$130,472', { text: '+107%', options: { bold: true, color: SUCCESS } }],
    ['Cash & Savings', '$55,453', '$129,122', { text: '+133%', options: { bold: true, color: SUCCESS } }],
    ['Reserves', '$47,010', '$101,325', { text: '+116%', options: { bold: true, color: SUCCESS } }],
    ['Receivables', '$7,676', '$1,350', { text: '-82%', options: { bold: true, color: SUCCESS } }],
  ];
  s.addTable(rows, {
    x: 0.7, y: 3.15, w: 6.3, colW: [2.2, 1.4, 1.4, 1.3],
    fontFace: SANS, fontSize: 11, color: DARK, valign: 'middle',
    border: { type: 'solid', color: 'E4E8F0', pt: 0.5 }, rowH: 0.45,
  });

  s.addShape('roundRect', { x: 7.6, y: 1.3, w: 5.0, h: 2.5, rectRadius: 0.12, fill: { color: PRIMARY }, line: { type: 'none' } });
  s.addText('+107%', { x: 7.6, y: 1.65, w: 5.0, h: 1.0, align: 'center', fontFace: HEAD, fontSize: 48, color: ACCENT_LIGHT, bold: true });
  s.addText('TOTAL ASSET GROWTH', { x: 7.6, y: 2.75, w: 5.0, h: 0.35, align: 'center', fontFace: SANS, fontSize: 11, color: 'A8B2C8', charSpacing: 2 });
  s.addText('In Just 24 Months', { x: 7.6, y: 3.1, w: 5.0, h: 0.35, align: 'center', fontFace: SANS, fontSize: 10, color: '7C88A3' });

  s.addShape('rect', { x: 7.6, y: 4.2, w: 0.05, h: 1.6, fill: { color: ACCENT }, line: { type: 'none' } });
  s.addText('Reserves properly allocated across 5 categories: Painting, Seal Coat, General Reserve, Interest, and Roof Replacement.', {
    x: 7.85, y: 4.2, w: 4.75, h: 1.6, fontFace: HEAD, fontSize: 13, italic: true, color: PRIMARY, valign: 'middle',
  });
  footer(s, 'Doral Grand Condominium Inc.');
}

// ============ SLIDE 9: MIRACLE ECONOMY ============
{
  const s = pptx.addSlide();
  s.background = { color: LIGHT_BG };
  badge(s, 0.7, 0.45, 1.5, 'Case Study', { fill: SUCCESS_LIGHT, color: SUCCESS });
  s.addText('The Miracle Economy', { x: 0.7, y: 0.85, w: 6.5, h: 0.6, fontFace: HEAD, fontSize: 26, color: PRIMARY, bold: true });
  s.addText('The Seasons Villas & Townhomes', { x: 0.7, y: 1.45, w: 6.5, h: 0.35, fontFace: SANS, fontSize: 13, bold: true, color: ACCENT });
  goldBar(s, 0.72, 1.9);
  s.addText("The Seasons had a $318K credit line debt. Under ASPMG, we completely paid it off while growing total assets by 73% and restructuring reserves to meet Florida's new requirements.", {
    x: 0.7, y: 2.1, w: 6.3, h: 0.95, fontFace: SANS, fontSize: 11.5, color: BODY,
  });

  const rows = [
    [{ text: 'Metric', options: { bold: true, color: WHITE, fill: { color: PRIMARY } } },
     { text: 'Aug 2023', options: { bold: true, color: WHITE, fill: { color: PRIMARY } } },
     { text: 'Feb 2026', options: { bold: true, color: WHITE, fill: { color: PRIMARY } } },
     { text: 'Change', options: { bold: true, color: WHITE, fill: { color: PRIMARY } } }],
    ['Total Assets', '$804,782', '$1,392,951', { text: '+73%', options: { bold: true, color: SUCCESS } }],
    ['Cash & Savings', '$555,378', '$1,198,615', { text: '+116%', options: { bold: true, color: SUCCESS } }],
    ['Credit Line Debt', '$318,728', '$0', { text: 'Paid Off', options: { bold: true, color: SUCCESS } }],
    ['Total Reserves', '$445,921', '$518,077', { text: '+16%', options: { bold: true, color: SUCCESS } }],
  ];
  s.addTable(rows, {
    x: 0.7, y: 3.2, w: 6.3, colW: [2.1, 1.5, 1.5, 1.2],
    fontFace: SANS, fontSize: 11, color: DARK, valign: 'middle',
    border: { type: 'solid', color: 'E4E8F0', pt: 0.5 }, rowH: 0.45, fill: { color: WHITE },
  });

  s.addShape('roundRect', { x: 7.6, y: 1.2, w: 5.0, h: 2.2, rectRadius: 0.12, fill: { color: PRIMARY }, line: { type: 'none' } });
  s.addText('$318,728', { x: 7.6, y: 1.5, w: 5.0, h: 0.85, align: 'center', fontFace: HEAD, fontSize: 38, color: ACCENT_LIGHT, bold: true });
  s.addText('CREDIT LINE DEBT → ELIMINATED', { x: 7.6, y: 2.45, w: 5.0, h: 0.35, align: 'center', fontFace: SANS, fontSize: 11, color: 'A8B2C8', charSpacing: 2 });

  s.addShape('roundRect', { x: 7.6, y: 3.7, w: 5.0, h: 2.4, rectRadius: 0.1, fill: { color: WHITE }, line: { type: 'none' } });
  s.addText('RESERVE RESTRUCTURING (SB 4-D COMPLIANT)', { x: 7.85, y: 3.85, w: 4.6, h: 0.3, fontFace: SANS, fontSize: 9, bold: true, color: BODY_LIGHT, charSpacing: 1.5 });
  const reserves = [['Waterproofing', '$348,152'], ['Roof', '$93,181'], ['Electrical', '$28,615'], ['Plumbing', '$24,909'], ['Fire Protection', '$14,214'], ['Structure', '$7,048']];
  reserves.forEach(([k, v], i) => {
    const x = 7.85 + (i % 2) * 2.35, y = 4.25 + Math.floor(i / 2) * 0.55;
    s.addText([
      { text: k + '\n', options: { fontSize: 9, color: BODY } },
      { text: v, options: { fontSize: 11, bold: true, color: ACCENT_DARK } },
    ], { x, y, w: 2.2, h: 0.55, fontFace: SANS, lineSpacing: 12 });
  });
  footer(s, 'The Seasons Villas & Townhomes');
}

// ============ SLIDE 10: INSURANCE SAVINGS ============
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  badge(s, 0.7, 0.45, 1.5, 'Case Study', { fill: SUCCESS_LIGHT, color: SUCCESS });
  s.addText('$200K Insurance Savings', { x: 0.7, y: 0.85, w: 6.5, h: 0.6, fontFace: HEAD, fontSize: 26, color: PRIMARY, bold: true });
  s.addText('Laguna Club Condominium', { x: 0.7, y: 1.45, w: 6.5, h: 0.35, fontFace: SANS, fontSize: 13, bold: true, color: ACCENT });
  goldBar(s, 0.72, 1.9);
  s.addText([
    { text: 'Previous management was paying over ', options: {} },
    { text: '$550K annually', options: { bold: true, color: PRIMARY } },
    { text: '. We secured the ', options: {} },
    { text: 'exact same coverage for $350K', options: { bold: true, color: PRIMARY } },
    { text: ' — saving over $200,000 every year.', options: {} },
  ], { x: 0.7, y: 2.1, w: 6.3, h: 0.85, fontFace: SANS, fontSize: 11.5, color: BODY });

  s.addShape('roundRect', { x: 0.7, y: 3.05, w: 6.3, h: 0.85, rectRadius: 0.06, fill: { color: SUCCESS_LIGHT }, line: { type: 'none' } });
  s.addShape('rect', { x: 0.7, y: 3.05, w: 0.05, h: 0.85, fill: { color: SUCCESS }, line: { type: 'none' } });
  s.addText("$200,000 back in the association's pocket — every single year. Same coverage. Smarter management.", {
    x: 0.9, y: 3.05, w: 6.0, h: 0.85, fontFace: SANS, fontSize: 11, bold: true, color: SUCCESS, valign: 'middle',
  });

  s.addText('How We Did It', { x: 0.7, y: 4.15, w: 6.3, h: 0.35, fontFace: SANS, fontSize: 13, bold: true, color: DARK });
  const hows = [
    'Multi-carrier competitive bidding — not just one quote',
    'Leveraged portfolio relationships for better rates',
    'Optimized coverage without reducing protection',
    'Eliminated unnecessary fees and redundant riders',
    'Ongoing annual review to prevent premium creep',
  ];
  hows.forEach((t, i) => {
    const y = 4.55 + i * 0.42;
    s.addShape('ellipse', { x: 0.78, y: y + 0.09, w: 0.1, h: 0.1, fill: { color: ACCENT }, line: { type: 'none' } });
    s.addText(t, { x: 1.0, y, w: 6.0, h: 0.4, fontFace: SANS, fontSize: 10.5, color: BODY });
  });

  s.addShape('roundRect', { x: 7.6, y: 1.2, w: 5.0, h: 3.3, rectRadius: 0.15, fill: { color: PRIMARY }, line: { type: 'none' } });
  s.addText('ANNUAL SAVINGS', { x: 7.6, y: 1.45, w: 5.0, h: 0.3, align: 'center', fontFace: SANS, fontSize: 10, color: '8C97B0', charSpacing: 2 });
  s.addText('$200K+', { x: 7.6, y: 1.75, w: 5.0, h: 0.9, align: 'center', fontFace: HEAD, fontSize: 46, color: ACCENT_LIGHT, bold: true });
  s.addText('Saved per year — same coverage', { x: 7.6, y: 2.7, w: 5.0, h: 0.3, align: 'center', fontFace: SANS, fontSize: 10, color: 'A8B2C8' });
  s.addText([
    { text: 'BEFORE ASPMG\n', options: { fontSize: 9, color: '8C97B0', charSpacing: 1.5 } },
    { text: '~$550K', options: { fontSize: 22, fontFace: HEAD, color: '8C97B0', strike: true } },
  ], { x: 7.8, y: 3.25, w: 2.2, h: 1.0, align: 'center', fontFace: SANS, lineSpacing: 22 });
  s.addText([
    { text: 'WITH ASPMG\n', options: { fontSize: 9, color: '8C97B0', charSpacing: 1.5 } },
    { text: '$350K', options: { fontSize: 22, fontFace: HEAD, color: ACCENT_LIGHT, bold: true } },
  ], { x: 10.2, y: 3.25, w: 2.2, h: 1.0, align: 'center', fontFace: SANS, lineSpacing: 22 });

  const cov = [['Coverage', 'Special Form + Wind/Hail'], ['Carrier', 'Slide Insurance Co.'], ['Ord/Law Limit', '$1,000,000'], ['Includes', 'Equipment Breakdown']];
  cov.forEach(([k, v], i) => {
    const x = 7.6 + (i % 2) * 2.6, y = 4.75 + Math.floor(i / 2) * 0.95;
    s.addShape('roundRect', { x, y, w: 2.4, h: 0.8, rectRadius: 0.06, fill: { color: LIGHT_BG }, line: { type: 'none' } });
    s.addText([
      { text: k.toUpperCase() + '\n', options: { fontSize: 8, color: BODY_LIGHT, charSpacing: 1 } },
      { text: v, options: { fontSize: 10, bold: true, color: i === 3 ? ACCENT_DARK : DARK } },
    ], { x: x + 0.15, y: y + 0.08, w: 2.15, h: 0.68, fontFace: SANS, lineSpacing: 13 });
  });
  footer(s, 'Laguna Club Condominium Assoc.');
}

// ============ SLIDE 11: PROJECTS DIVIDER ============
sectionDivider('04', 'Project Management',
  'End-to-end oversight of capital improvement projects with full photo documentation and board transparency.');

// ============ SLIDE 12: ROOF REPLACEMENT ============
{
  const s = pptx.addSlide();
  s.background = { color: LIGHT_BG };
  badge(s, 0.7, 0.45, 1.8, 'Capital Projects', { fill: 'E6E9F0', color: PRIMARY });
  s.addText('Roof Replacement', { x: 0.7, y: 0.85, w: 8, h: 0.6, fontFace: HEAD, fontSize: 28, color: PRIMARY, bold: true });
  goldBar(s, 0.72, 1.55);

  s.addImage({ path: IMG('roof-before.jpg'), x: 0.7, y: 1.85, w: 5.95, h: 3.35, sizing: { type: 'cover', w: 5.95, h: 3.35 } });
  s.addImage({ path: IMG('roof-after.jpg'), x: 6.95, y: 1.85, w: 5.95, h: 3.35, sizing: { type: 'cover', w: 5.95, h: 3.35 } });
  badge(s, 0.95, 2.1, 1.1, 'Before', { fill: PRIMARY, color: WHITE });
  badge(s, 7.2, 2.1, 1.1, 'After', { fill: ACCENT, color: WHITE });

  s.addShape('rect', { x: 0.7, y: 5.5, w: 0.05, h: 1.15, fill: { color: ACCENT }, line: { type: 'none' } });
  s.addText('Complete roof replacement managed from bid solicitation through final inspection — on time and within budget. Modern standing-seam metal roofing for long-term durability.', {
    x: 0.95, y: 5.5, w: 7.4, h: 1.15, fontFace: HEAD, fontSize: 12.5, italic: true, color: PRIMARY, valign: 'middle',
  });
  statCard(s, 8.8, 5.45, 1.9, 1.25, '100%', 'Completed', { numSize: 20, labelSize: 8 });
  statCard(s, 10.9, 5.45, 1.9, 1.25, 'Drone', 'Documented', { numSize: 20, labelSize: 8 });
  footer(s, 'C-West Building');
}

// ============ SLIDE 13: BUILDING PAINT ============
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  badge(s, 0.7, 0.45, 1.8, 'Capital Projects', { fill: 'E6E9F0', color: PRIMARY });
  s.addText('Building Paint — Before & After', { x: 0.7, y: 0.85, w: 9, h: 0.6, fontFace: HEAD, fontSize: 26, color: PRIMARY, bold: true });
  s.addText('Ibiza Village Condominium Association', { x: 0.7, y: 1.45, w: 9, h: 0.35, fontFace: SANS, fontSize: 13, bold: true, color: ACCENT });
  goldBar(s, 0.72, 1.9);

  ['ibiza-1.jpg', 'ibiza-2.jpg', 'ibiza-3.jpg'].forEach((f, i) => {
    s.addImage({ path: IMG(f), x: 0.7 + i * 4.1, y: 2.2, w: 3.9, h: 3.0, sizing: { type: 'cover', w: 3.9, h: 3.0 } });
  });

  s.addShape('rect', { x: 0.7, y: 5.55, w: 0.05, h: 1.1, fill: { color: ACCENT }, line: { type: 'none' } });
  s.addText('Complete exterior paint project transforming faded, weathered buildings into a vibrant, modern community aesthetic — managed from color selection through final walkthrough.', {
    x: 0.95, y: 5.55, w: 11.6, h: 1.1, fontFace: HEAD, fontSize: 12.5, italic: true, color: PRIMARY, valign: 'middle',
  });
  footer(s, 'Ibiza Village Condominium Assoc.');
}

// ============ SLIDE 14: FLOOR REPLACEMENT ============
{
  const s = pptx.addSlide();
  s.background = { color: LIGHT_BG };
  badge(s, 0.7, 0.45, 1.8, 'Capital Projects', { fill: 'E6E9F0', color: PRIMARY });
  s.addText('Floor Replacement', { x: 0.7, y: 0.85, w: 6, h: 0.6, fontFace: HEAD, fontSize: 26, color: PRIMARY, bold: true });
  s.addText('Bleau Fontaine Condominium', { x: 0.7, y: 1.45, w: 6, h: 0.35, fontFace: SANS, fontSize: 13, bold: true, color: ACCENT });
  goldBar(s, 0.72, 1.9);
  s.addText('Dated terracotta tile transformed into modern gray porcelain throughout lobbies, hallways, and stairwells.', {
    x: 0.7, y: 2.1, w: 5.6, h: 0.7, fontFace: SANS, fontSize: 11.5, color: BODY,
  });

  const steps = [
    ['Bid Solicitation', 'Competitive bids obtained and presented to the board'],
    ['Material Selection', 'Board-approved porcelain with slip-resistant finish'],
    ['Execution & Oversight', 'Daily monitoring with minimal disruption to residents'],
    ['Final Inspection', 'Quality walkthrough and before/after documentation'],
  ];
  s.addShape('rect', { x: 0.95, y: 3.15, w: 0.025, h: 3.3, fill: { color: ACCENT }, line: { type: 'none' } });
  steps.forEach(([t, b], i) => {
    const y = 3.1 + i * 0.92;
    s.addShape('ellipse', { x: 0.88, y: y + 0.05, w: 0.17, h: 0.17, fill: { color: ACCENT }, line: { color: WHITE, width: 1.5 } });
    s.addText(t, { x: 1.25, y: y - 0.05, w: 5.0, h: 0.35, fontFace: SANS, fontSize: 12, bold: true, color: DARK });
    s.addText(b, { x: 1.25, y: y + 0.27, w: 5.0, h: 0.4, fontFace: SANS, fontSize: 10, color: BODY_LIGHT });
  });

  s.addImage({ path: IMG('bf2-floor-1.jpg'), x: 7.0, y: 1.0, w: 5.6, h: 5.7, sizing: { type: 'contain', w: 5.6, h: 5.7 } });
  footer(s, 'Bleau Fontaine Condo No. 2');
}

// ============ SLIDE 15: POOL ============
{
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  badge(s, 0.7, 0.45, 2.1, 'Amenity Management', { fill: 'E6E9F0', color: PRIMARY });
  s.addText('Pool Resurfacing & Maintenance', { x: 0.7, y: 0.85, w: 7.5, h: 0.6, fontFace: HEAD, fontSize: 26, color: PRIMARY, bold: true });
  goldBar(s, 0.72, 1.55);
  s.addText('From draining to resurfacing to final fill — every step documented with photos and reported to the board. Our hands-on approach ensures quality control at every stage.', {
    x: 0.7, y: 1.8, w: 7.2, h: 0.85, fontFace: SANS, fontSize: 11.5, color: BODY,
  });

  const cards = [
    ['Emptied & Inspected', 'Full drain, structural inspection, and surface assessment'],
    ['Resurfaced & Filled', 'New plaster application, chemical balance, and reopening'],
    ['Photo Documented', 'Every phase captured and shared with the board'],
    ['Vendor Managed', 'All contractors vetted, insured, and supervised on-site'],
  ];
  cards.forEach(([t, b], i) => {
    featureCard(s, 0.7 + (i % 2) * 3.7, 2.95 + Math.floor(i / 2) * 1.75, 3.5, 1.55, t, b);
  });

  s.addImage({ path: IMG('pool-1.jpg'), x: 8.3, y: 0.85, w: 4.3, h: 5.7, sizing: { type: 'cover', w: 4.3, h: 5.7 } });
  footer(s, 'Pool Management');
}

// ============ SLIDE 16: INSPECTIONS DIVIDER ============
sectionDivider('05', 'Proactive Inspections',
  'Detailed, photo-documented inspection reports that catch issues early and track resolution over time.');

// ============ SLIDE 17: INSPECTION REPORTS ============
{
  const s = pptx.addSlide();
  s.background = { color: LIGHT_BG };
  badge(s, 0.7, 0.45, 1.9, 'Quality Assurance');
  s.addText('Detailed Inspection Reports', { x: 0.7, y: 0.85, w: 6.5, h: 0.6, fontFace: HEAD, fontSize: 25, color: PRIMARY, bold: true });
  s.addText('Shamrock Condominium — Feb 2026', { x: 0.7, y: 1.45, w: 6.5, h: 0.35, fontFace: SANS, fontSize: 12, bold: true, color: ACCENT });
  goldBar(s, 0.72, 1.85);
  s.addText('Regular on-site inspections with numbered photos, detailed descriptions, and follow-up tracking on every issue.', {
    x: 0.7, y: 2.05, w: 6.2, h: 0.65, fontFace: SANS, fontSize: 11, color: BODY,
  });

  s.addShape('roundRect', { x: 0.7, y: 2.85, w: 6.2, h: 1.9, rectRadius: 0.08, fill: { color: WHITE }, line: { type: 'none' } });
  s.addText('What We Document', { x: 0.95, y: 3.0, w: 5.7, h: 0.32, fontFace: SANS, fontSize: 11.5, bold: true, color: DARK });
  const docs = ['Storage compliance', 'A/C filter tracking', 'Fire alarm permits', 'Lighting & electrical', 'Common area violations', 'Pool condition', 'Landscaping', 'Plumbing & structural'];
  docs.forEach((d, i) => {
    const x = 0.95 + (i % 2) * 2.9, y = 3.38 + Math.floor(i / 2) * 0.33;
    s.addText('•  ' + d, { x, y, w: 2.8, h: 0.32, fontFace: SANS, fontSize: 10, color: BODY_LIGHT });
  });

  statCard(s, 0.7, 5.05, 1.95, 1.4, '23', 'Pages', { numSize: 22, labelSize: 9 });
  statCard(s, 2.85, 5.05, 1.95, 1.4, '15+', 'Photos', { numSize: 22, labelSize: 9 });
  statCard(s, 5.0, 5.05, 1.9, 1.4, 'Every', 'Issue Tracked', { numSize: 20, labelSize: 9 });

  ['inspection-01.jpg', 'inspection-02.jpg', 'inspection-03.jpg'].forEach((f, i) => {
    s.addImage({ path: IMG(f), x: 7.4 + i * 1.85, y: 1.6, w: 1.7, h: 2.2, sizing: { type: 'cover', w: 1.7, h: 2.2 } });
  });
  s.addShape('roundRect', { x: 7.4, y: 4.05, w: 5.4, h: 2.4, rectRadius: 0.08, fill: { color: WHITE }, line: { type: 'none' } });
  s.addText([
    { text: 'Full documentation\n', options: { bold: true, fontSize: 12, color: DARK } },
    { text: 'Every observation numbered, photographed, and tracked with follow-up notes — issues identified, A/C filters logged with change dates, and resolutions confirmed on the next visit.', options: { fontSize: 10.5, color: BODY_LIGHT } },
  ], { x: 7.65, y: 4.25, w: 4.9, h: 2.0, fontFace: SANS, valign: 'top', lineSpacing: 15 });
  footer(s, 'Shamrock Condominium');
}

// ============ SLIDE 18: BOARD TRANSPARENCY ============
{
  const s = pptx.addSlide();
  s.background = { color: PRIMARY_DARK };
  badge(s, W / 2 - 1.0, 0.55, 2.0, 'Our Promise', { fill: '3A4A6E', color: ACCENT_LIGHT });
  s.addText('Total Transparency with Your Board', { x: 0, y: 1.0, w: W, h: 0.7, align: 'center', fontFace: HEAD, fontSize: 30, color: WHITE, bold: true });
  goldBar(s, W / 2 - 0.4, 1.8);
  s.addText('Every dollar accounted for. Every project documented. Every decision informed by data.', {
    x: 0, y: 2.0, w: W, h: 0.4, align: 'center', fontFace: SANS, fontSize: 12.5, color: 'A8B2C8',
  });

  const cards = [
    ['Monthly Financials', 'P&L, balance sheets, and bank reconciliations'],
    ['Photo Reports', 'Inspections and project updates with full imagery'],
    ['Reserve Tracking', 'Real-time funding status and projections'],
    ['Open Communication', 'Direct line to your manager — always responsive'],
  ];
  const cw = 2.75, gap = 0.3, x0 = (W - (cw * 4 + gap * 3)) / 2;
  cards.forEach(([t, b], i) => {
    const x = x0 + i * (cw + gap);
    s.addShape('roundRect', { x, y: 2.75, w: cw, h: 1.9, rectRadius: 0.1, fill: { color: '263656' }, line: { color: '36476B', width: 0.75 } });
    s.addText(t, { x: x + 0.15, y: 2.95, w: cw - 0.3, h: 0.55, fontFace: SANS, fontSize: 12, bold: true, color: WHITE });
    s.addText(b, { x: x + 0.15, y: 3.5, w: cw - 0.3, h: 1.0, fontFace: SANS, fontSize: 9.5, color: 'A8B2C8', valign: 'top' });
  });

  s.addShape('rect', { x: 3.1, y: 5.15, w: 0.05, h: 1.2, fill: { color: ACCENT_LIGHT }, line: { type: 'none' } });
  s.addText('"An informed board makes better decisions. We provide more data, more often, and with more context than any other management company."', {
    x: 3.35, y: 5.15, w: 7.0, h: 1.2, fontFace: HEAD, fontSize: 13, italic: true, color: 'D8DEE9', valign: 'middle',
  });
  footer(s, 'Board Transparency', true);
}

// ============ SLIDE 19: WHY ASPMG ============
{
  const s = pptx.addSlide();
  s.background = { color: LIGHT_BG };
  badge(s, W / 2 - 1.2, 0.45, 2.4, 'The Right Partner');
  s.addText('Why ASPMG for Your Community?', { x: 0, y: 0.85, w: W, h: 0.7, align: 'center', fontFace: HEAD, fontSize: 28, color: PRIMARY, bold: true });
  goldBar(s, W / 2 - 0.4, 1.6);

  const reasons = [
    ['Proven Financial Results', 'We grow reserves and eliminate debt. Our track record speaks through balance sheets, not promises.'],
    ['Technology That Empowers', 'ApplyHOA gives your board and residents 24/7 access to payments, documents, and real-time data.'],
    ['Hands-On Project Management', 'Roofs, pools, paint — every detail overseen, every phase documented, delivered on time.'],
    ['Proactive, Not Reactive', 'Detailed inspections catch problems before emergencies. We identify, document, and resolve.'],
    ['Insurance Expertise', 'Saved Laguna Club $200K/year — same coverage. Portfolio leverage for rates no single association gets.'],
    ['SB 4-D Compliance Ready', "Reserves already restructured across our portfolio for Florida's structural integrity requirements."],
  ];
  const cw2 = 5.85, ch2 = 1.4, gx = 0.4, gy = 0.25, x0 = (W - (cw2 * 2 + gx)) / 2, y0 = 2.0;
  reasons.forEach(([t, b], i) => {
    const x = x0 + (i % 2) * (cw2 + gx), y = y0 + Math.floor(i / 2) * (ch2 + gy);
    s.addShape('roundRect', {
      x, y, w: cw2, h: ch2, rectRadius: 0.08, fill: { color: WHITE }, line: { type: 'none' },
      shadow: { type: 'outer', color: PRIMARY, opacity: 0.1, blur: 6, offset: 2, angle: 90 },
    });
    s.addShape('rect', { x, y, w: 0.045, h: ch2, fill: { color: ACCENT }, line: { type: 'none' } });
    s.addText(`${i + 1}.`, { x: x + 0.18, y: y + 0.15, w: 0.5, h: 0.5, fontFace: HEAD, fontSize: 20, color: ACCENT, bold: true });
    s.addText(t, { x: x + 0.75, y: y + 0.12, w: cw2 - 0.9, h: 0.35, fontFace: SANS, fontSize: 12, bold: true, color: DARK });
    s.addText(b, { x: x + 0.75, y: y + 0.47, w: cw2 - 0.9, h: ch2 - 0.6, fontFace: SANS, fontSize: 10, color: BODY_LIGHT, valign: 'top' });
  });
  footer(s, 'Why ASPMG');
}

// ============ SLIDE 20: CTA ============
{
  const s = pptx.addSlide();
  s.background = { color: PRIMARY_DARK };
  s.addImage({ path: IMG('logo.png'), x: W / 2 - 0.75, y: 0.65, w: 1.5, h: 1.34 });
  s.addText([
    { text: "Let's Build Something\n", options: { color: WHITE } },
    { text: 'Great Together', options: { color: ACCENT_LIGHT } },
  ], { x: 0, y: 2.15, w: W, h: 1.5, align: 'center', fontFace: HEAD, fontSize: 38, bold: true, lineSpacing: 44 });
  goldBar(s, W / 2 - 0.5, 3.85, 1.0);
  s.addText("We're ready to bring the same level of excellence, transparency, and innovation to your community.", {
    x: W / 2 - 3.2, y: 4.05, w: 6.4, h: 0.7, align: 'center', fontFace: SANS, fontSize: 13, color: 'A8B2C8',
  });

  const contacts = [['PHONE', '(305) 661-8400'], ['WEB', 'www.aspmg.com'], ['OFFICE', '85 Grand Canal Dr, Suite 201\nMiami, FL 33144']];
  const cw3 = 3.4, gap3 = 0.35, x0 = (W - (cw3 * 3 + gap3 * 2)) / 2;
  contacts.forEach(([k, v], i) => {
    const x = x0 + i * (cw3 + gap3);
    s.addShape('roundRect', { x, y: 5.0, w: cw3, h: 1.1, rectRadius: 0.1, fill: { color: '263656' }, line: { color: '36476B', width: 0.75 } });
    s.addText([
      { text: k + '\n', options: { fontSize: 8.5, color: ACCENT_LIGHT, charSpacing: 2, bold: true } },
      { text: v, options: { fontSize: 11.5, color: 'E2E7F0' } },
    ], { x: x + 0.2, y: 5.0, w: cw3 - 0.4, h: 1.1, align: 'center', valign: 'middle', fontFace: SANS, lineSpacing: 15 });
  });

  s.addText('A SOLID PROPERTY MANAGEMENT GROUP INC.  •  CONFIDENTIAL  •  2026', {
    x: 0, y: 6.7, w: W, h: 0.35, align: 'center', fontFace: SANS, fontSize: 9, color: '566181', charSpacing: 2,
  });
}

pptx.writeFile({ fileName: OUT }).then(() => {
  console.log('Written:', OUT);
});
