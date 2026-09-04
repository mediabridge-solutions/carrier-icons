import fs from 'node:fs';
import path from 'node:path';

function cleanSvg(content) {
  return content
    .replace(/<\?xml[^>]*\?>/gi, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\?xml-stylesheet[^>]*\?>/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractInner(svg) {
  const m = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  return m ? m[1].trim() : svg;
}

function getViewBox(svg) {
  const m = svg.match(/viewBox=["']([^"']+)["']/i);
  if (m) return m[1];
  const wm = svg.match(/width=["']([^"'px]+)/i);
  const hm = svg.match(/height=["']([^"'px]+)/i);
  if (wm && hm) return `0 0 ${wm[1]} ${hm[1]}`;
  return "0 0 100 100";
}

function createInlineBadge(innerSvg, vb, bg, border, padX = 6, padY = 3, width = 88, height = 18) {
  const borderAttr = border ? ` stroke="${border}" stroke-width="1"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" rx="3" fill="${bg}"${borderAttr}/><svg x="${padX}" y="${padY}" width="${width}" height="${height}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${innerSvg}</svg></svg>`;
}

const carriersDir = path.resolve('src/carriers');

// 1. DHL
{
  const raw = fs.readFileSync('/tmp/dhl.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffcc00', '#e6b800', 6, 2, 88, 20);

  const code = `import { CarrierDefinition } from '../types';

export const dhl: CarrierDefinition = {
  code: 'dhl',
  name: 'DHL Paket',
  label: 'DHL',
  category: 'parcel',
  country: 'DE',
  aliases: ['dhl_paket', 'dhl_express', 'dhl_freight', 'deutsche_post_dhl'],
  colors: {
    bg: '#ffcc00',
    fg: '#d40511',
    border: '#e6b800',
  },
  tracking: {
    urlTemplate: 'https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'dhl.ts'), code, 'utf8');
}

// 2. Kleine Spedition
{
  const raw = fs.readFileSync('/tmp/kleine.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffffff', '#cbd5e1', 8, 3, 84, 18);

  const code = `import { CarrierDefinition } from '../types';

export const kleine: CarrierDefinition = {
  code: 'kleine',
  name: 'Kleine Spedition',
  label: 'Kleine',
  category: 'freight',
  country: 'DE',
  aliases: ['kleine_spedition', 'spedition_kleine'],
  colors: {
    bg: '#001950',
    fg: '#ffa028',
    border: '#001030',
  },
  tracking: {
    description: 'Kleine Spedition forwarding, freight & logistics network.',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'kleine.ts'), code, 'utf8');
}

// 3. 24plus Systemverkehre (Separate carrier)
{
  const raw = fs.readFileSync('/tmp/24plus.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffffff', '#cbd5e1', 8, 2, 84, 20);

  const code = `import { CarrierDefinition } from '../types';

export const twentyFourPlus: CarrierDefinition = {
  code: '24plus',
  name: '24plus Systemverkehre',
  label: '24plus',
  category: 'freight',
  country: 'DE',
  aliases: ['twentyfourplus', '24_plus', '24plus_logistics'],
  colors: {
    bg: '#035094',
    fg: '#ffffff',
    border: '#023868',
  },
  tracking: {
    urlTemplate: 'https://24plus.de/?lang=en&s={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'twentyFourPlus.ts'), code, 'utf8');
}

// 4. DPD
{
  const raw = fs.readFileSync('/tmp/dpd.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffffff', '#e5e7eb', 8, 3, 84, 18);

  const code = `import { CarrierDefinition } from '../types';

export const dpd: CarrierDefinition = {
  code: 'dpd',
  name: 'DPD',
  label: 'DPD',
  category: 'parcel',
  country: 'DE',
  aliases: ['dpd_de', 'dpd_ch', 'dpd_at', 'dpd_group', 'geopost'],
  colors: {
    bg: '#dc0032',
    fg: '#ffffff',
    border: '#b00028',
  },
  tracking: {
    urlTemplate: 'https://tracking.dpd.de/status/de_DE/parcel/{trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'dpd.ts'), code, 'utf8');
}

// 5. UPS
{
  const raw = fs.readFileSync('/tmp/ups.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#351c15', '#24120d', 10, 2, 80, 20);

  const code = `import { CarrierDefinition } from '../types';

export const ups: CarrierDefinition = {
  code: 'ups',
  name: 'UPS',
  label: 'UPS',
  category: 'parcel',
  country: 'US',
  aliases: ['united_parcel_service', 'ups_express', 'ups_ground'],
  colors: {
    bg: '#351c15',
    fg: '#ffb500',
    border: '#24120d',
  },
  tracking: {
    urlTemplate: 'https://www.ups.com/track?tracknum={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'ups.ts'), code, 'utf8');
}

// 6. FedEx
{
  const raw = fs.readFileSync('/tmp/fedex.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffffff', '#e5e7eb', 8, 3, 84, 18);

  const code = `import { CarrierDefinition } from '../types';

export const fedex: CarrierDefinition = {
  code: 'fedex',
  name: 'FedEx',
  label: 'FedEx',
  category: 'express',
  country: 'US',
  aliases: ['federal_express', 'fedex_express', 'fedex_ground'],
  colors: {
    bg: '#4d148c',
    fg: '#ff6600',
    border: '#370e63',
  },
  tracking: {
    urlTemplate: 'https://www.fedex.com/fedextrack/?trknbr={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'fedex.ts'), code, 'utf8');
}

// 7. GLS
{
  const raw = fs.readFileSync('/tmp/gls.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffffff', '#e5e7eb', 8, 3, 84, 18);

  const code = `import { CarrierDefinition } from '../types';

export const gls: CarrierDefinition = {
  code: 'gls',
  name: 'GLS',
  label: 'GLS',
  category: 'parcel',
  country: 'NL',
  aliases: ['gls_group', 'gls_germany', 'general_logistics_systems'],
  colors: {
    bg: '#002664',
    fg: '#ffc600',
    border: '#001a45',
  },
  tracking: {
    urlTemplate: 'https://gls-group.com/track/{trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'gls.ts'), code, 'utf8');
}

// 8. Dachser
{
  const raw = fs.readFileSync('/tmp/dachser.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffcc00', '#e6b800', 8, 3, 84, 18);

  const code = `import { CarrierDefinition } from '../types';

export const dachser: CarrierDefinition = {
  code: 'dachser',
  name: 'Dachser Intelligent Logistics',
  label: 'Dachser',
  category: 'freight',
  country: 'DE',
  aliases: ['dachser_se', 'dachser_logistics', 'dachser_spedition'],
  colors: {
    bg: '#003064',
    fg: '#fcd116',
    border: '#002042',
  },
  tracking: {
    urlTemplate: 'https://www.dachser.com/de/tracking?ss={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'dachser.ts'), code, 'utf8');
}

// 9. DB Schenker
{
  const raw = fs.readFileSync('/tmp/db_schenker.svg', 'utf8');
  let clean = cleanSvg(raw);
  if (!clean.includes('viewBox')) {
    clean = clean.replace('<svg ', '<svg viewBox="0 0 370 65" ');
  }
  const vb = '0 0 370 65';
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffffff', '#e5e7eb', 6, 4, 88, 16);

  const code = `import { CarrierDefinition } from '../types';

export const dbSchenker: CarrierDefinition = {
  code: 'db_schenker',
  name: 'DB Schenker',
  label: 'DB Schenker',
  category: 'freight',
  country: 'DE',
  aliases: ['dbschenker', 'schenker', 'deutsche_bahn_schenker'],
  colors: {
    bg: '#000000',
    fg: '#eb1800',
    border: '#222222',
  },
  tracking: {
    urlTemplate: 'https://www.dbschenker.com/global/tracking?tracking_number={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'dbSchenker.ts'), code, 'utf8');
}

// 10. Deutsche Post
{
  const raw = fs.readFileSync('/tmp/deutsche_post.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffcc00', '#e6b800', 8, 3, 84, 18);

  const code = `import { CarrierDefinition } from '../types';

export const deutschePost: CarrierDefinition = {
  code: 'deutsche_post',
  name: 'Deutsche Post',
  label: 'Deutsche Post',
  category: 'postal',
  country: 'DE',
  aliases: ['dp', 'deutschepost', 'post_de'],
  colors: {
    bg: '#ffcc00',
    fg: '#000000',
    border: '#e6b800',
  },
  tracking: {
    urlTemplate: 'https://www.deutschepost.de/sendung/simpleQuery.html?locale=de_DE&init=true&form.sendungsnummer={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'deutschePost.ts'), code, 'utf8');
}

// 11. Gebrüder Weiss
{
  const raw = fs.readFileSync('/tmp/gw.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ff6600', '#e65c00', 8, 3, 84, 18);

  const code = `import { CarrierDefinition } from '../types';

export const gebruederWeiss: CarrierDefinition = {
  code: 'gebrueder_weiss',
  name: 'Gebrüder Weiss',
  label: 'Gebrüder Weiss',
  category: 'freight',
  country: 'AT',
  aliases: ['gw', 'gebruederweiss', 'gw_world'],
  colors: {
    bg: '#ff6600',
    fg: '#ffffff',
    border: '#e65c00',
  },
  tracking: {
    urlTemplate: 'https://www.gw-world.com/e-services/tracking?number={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'gebruederWeiss.ts'), code, 'utf8');
}

// 12. Hermes
{
  const raw = fs.readFileSync('/tmp/hermes.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffffff', '#e5e7eb', 8, 3, 84, 18);

  const code = `import { CarrierDefinition } from '../types';

export const hermes: CarrierDefinition = {
  code: 'hermes',
  name: 'Hermes / Evri',
  label: 'Hermes',
  category: 'parcel',
  country: 'DE',
  aliases: ['myhermes', 'hermes_einrichtungsservice', 'evri'],
  colors: {
    bg: '#00a0e2',
    fg: '#ffffff',
    border: '#008cc7',
  },
  tracking: {
    urlTemplate: 'https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsinformation#{trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'hermes.ts'), code, 'utf8');
}

// 13. Planzer
{
  const raw = fs.readFileSync('/tmp/planzer.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#c4121a', '#a30f16', 8, 3, 84, 18);

  const code = `import { CarrierDefinition } from '../types';

export const planzer: CarrierDefinition = {
  code: 'planzer',
  name: 'Planzer Transport',
  label: 'Planzer',
  category: 'freight',
  country: 'CH',
  aliases: ['planzer_paket', 'planzer_transport', 'planzer_ch'],
  colors: {
    bg: '#c4121a',
    fg: '#ffffff',
    border: '#9e0e15',
  },
  tracking: {
    urlTemplate: 'https://service.planzer-paket.ch/tracking/?lang=de&id={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'planzer.ts'), code, 'utf8');
}

// 14. Post.at (Österreichische Post)
{
  const raw = fs.readFileSync('/tmp/post_at.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffcc00', '#e6b800', 10, 2, 80, 20);

  const code = `import { CarrierDefinition } from '../types';

export const postAt: CarrierDefinition = {
  code: 'post_at',
  name: 'Österreichische Post',
  label: 'Post.at',
  category: 'postal',
  country: 'AT',
  aliases: ['austrian_post', 'oesterreichische_post', 'post_austria'],
  colors: {
    bg: '#ffcc00',
    fg: '#000000',
    border: '#e6b800',
  },
  tracking: {
    urlTemplate: 'https://www.post.at/sendungsverfolgung.php?pknr={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'postAt.ts'), code, 'utf8');
}

// 15. Swiss Post
{
  const raw = fs.readFileSync('/tmp/swiss_post.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ffcc00', '#e6b800', 10, 2, 80, 20);

  const code = `import { CarrierDefinition } from '../types';

export const swissPost: CarrierDefinition = {
  code: 'swiss_post',
  name: 'Swiss Post',
  label: 'Die Post',
  category: 'postal',
  country: 'CH',
  aliases: ['post_ch', 'die_post', 'swisspost', 'la_poste_ch'],
  colors: {
    bg: '#ffcc00',
    fg: '#d50000',
    border: '#e6b800',
  },
  tracking: {
    urlTemplate: 'https://service.post.ch/ekp-web/kpm/itemSearchList.do?consignmentId={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'swissPost.ts'), code, 'utf8');
}

// 16. TNT Express
{
  const raw = fs.readFileSync('/tmp/tnt.svg', 'utf8');
  const clean = cleanSvg(raw);
  const vb = getViewBox(clean);
  const inner = extractInner(clean);
  const inline = createInlineBadge(inner, vb, '#ff6600', '#e65c00', 10, 3, 80, 18);

  const code = `import { CarrierDefinition } from '../types';

export const tnt: CarrierDefinition = {
  code: 'tnt',
  name: 'TNT Express',
  label: 'TNT',
  category: 'express',
  country: 'NL',
  aliases: ['tnt_express', 'tnt_direct'],
  colors: {
    bg: '#ff6600',
    fg: '#ffffff',
    border: '#e65c00',
  },
  tracking: {
    urlTemplate: 'https://www.tnt.com/express/en_gc/site/shipping-tools/tracking.html?searchType=CON&cons={trackingNumber}',
  },
  svg: ${JSON.stringify(clean)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'tnt.ts'), code, 'utf8');
}

// 17. Manual
{
  const realSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`;
  const inline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" rx="3" fill="#475569"/><svg x="12" y="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg><text x="56" y="16" fill="#ffffff" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="700" font-size="11" text-anchor="middle" letter-spacing="0.5">MANUAL</text></svg>`;

  const code = `import { CarrierDefinition } from '../types';

export const manual: CarrierDefinition = {
  code: 'manual',
  name: 'Manual / Forwarder',
  label: 'Manual',
  category: 'manual',
  aliases: ['other', 'custom', 'forwarder', 'spedition'],
  colors: {
    bg: '#475569',
    fg: '#ffffff',
    border: '#334155',
  },
  tracking: {
    description: 'Manual delivery, in-house vehicle, or custom freight forwarder.',
  },
  svg: ${JSON.stringify(realSvg)},
  inlineSvg: ${JSON.stringify(inline)},
};
`;
  fs.writeFileSync(path.join(carriersDir, 'manual.ts'), code, 'utf8');
}

console.log('Successfully updated all 17 carrier definition files!');
