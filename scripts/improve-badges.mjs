import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const carriersDir = path.join(root, 'src', 'carriers');

// 1. Swiss Post:
// Real logo has yellow rect <rect class="st0" .../> with red polygon cross & black P.
// In inline badge, having white background makes the yellow square + red cross + black P crisp and authentic!
// Also let's ensure the Swiss Post svg has clean colors.
const swissPostPath = path.join(carriersDir, 'swissPost.ts');
let swissPostCode = fs.readFileSync(swissPostPath, 'utf8');
// Real SVG is fine (yellow background with red cross and P), but inline badge:
// Let's make inline badge have a white background with a subtle border, containing the official yellow square logo with red cross and P.
const swissPostInline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" rx="3" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/><svg x="10" y="2" width="80" height="20" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet"><g id="Logo"><rect x="0" y="0" fill="#FFCC00" rx="3" width="56" height="56"/><polygon fill="#FF0000" points="26.44,25.12 26.44,14.78 15.32,14.78 15.32,22.63 7.78,22.63 7.78,33.37 15.32,33.37 15.32,41.22 26.44,41.22 26.44,30.88 23.8,30.88 23.8,38.73 17.97,38.73 17.97,30.88 10.42,30.88 10.42,25.12 17.97,25.12 17.97,17.27 23.8,17.27 23.8,25.12 "/><path fill="#000000" d="M41.66,24.19c0,1.88-1.55,3.34-3.51,3.34h-2.99v-6.46h2.99C40.19,21.08,41.66,22.39,41.66,24.19z M39.43,14.78H28v26.44h7.16v-7.86h4.28c5.25,0,9.33-4.01,9.33-9.18C48.76,18.97,44.61,14.78,39.43,14.78z"/></g></svg></svg>`;

swissPostCode = swissPostCode.replace(/inlineSvg:\s*"[^"]*",/s, `inlineSvg: ${JSON.stringify(swissPostInline)},`);
fs.writeFileSync(swissPostPath, swissPostCode);

// 2. Dachser:
// Real logo has "DACHSER" and "Intelligent Logistics".
// For the inline badge: remove "Intelligent Logistics", keep only "DACHSER" bold blue text on yellow background, making it prominently readable!
const dachserPath = path.join(carriersDir, 'dachser.ts');
let dachserCode = fs.readFileSync(dachserPath, 'utf8');
// DACHSER letters viewBox from ~15 to 135 horizontally, 35 to 65 vertically: viewBox="15 38 115 24"
const dachserInline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" rx="3" fill="#fbba00"/><svg x="8" y="3" width="84" height="18" viewBox="18 38 108 24" preserveAspectRatio="xMidYMid meet"><path fill="#1a3682" d="m 23.6,43.76 h 2.67 c 3.73,0 4.92,2.52 4.92,6.46 0,4.33 -2.07,5.86 -4.25,5.86 H 23.6 Z m -3.75,15.93 h 7.35 c 5.21,0 7.74,-4.21 7.74,-9.88 0,-6.48 -3.32,-9.66 -7.74,-9.66 h -7.35 z"/><path fill="#1a3682" d="m 41.87,45 h 0.05 l 2.15,7.17 h -4.42 z m -8.34,14.69 h 3.8 l 1.34,-4.35 h 6.38 l 1.29,4.35 h 3.89 L 43.85,40.15 H 40 Z"/><path fill="#1a3682" d="M 61.27,46.72 A 3.85,3.85 0 0 0 57.54,43.3 c -3.36,0 -4.63,3.28 -4.63,6.7 0,3.26 1.27,6.54 4.63,6.54 2.3,0 3.59,-1.8 3.87,-4.37 H 65 c -0.38,4.87 -3.32,8 -7.5,8 -5.28,0 -8.38,-4.52 -8.38,-10.16 0,-5.8 3.1,-10.31 8.38,-10.31 3.75,0 6.91,2.51 7.36,7 z"/><polygon fill="#1a3682" points="77.01,59.69 77.01,51.26 70.11,51.26 70.11,59.69 66.35,59.69 66.35,40.15 70.11,40.15 70.11,47.65 77.01,47.65 77.01,40.15 80.76,40.15 80.76,59.69"/><path fill="#1a3682" d="m 85.36,53.21 c 0,2.6 1.77,3.61 3.78,3.61 1.31,0 3.32,-0.44 3.32,-2.44 0,-2 -2.56,-2.46 -5.07,-3.23 -2.51,-0.77 -5.08,-1.89 -5.08,-5.55 0,-4 3.29,-5.91 6.37,-5.91 3.56,0 6.84,1.77 6.84,6.29 h -3.63 c -0.12,-2.35 -1.58,-3 -3.37,-3 -1.2,0 -2.58,0.58 -2.58,2.22 0,1.64 0.81,1.7 5.09,3 1.24,0.35 5.06,1.26 5.06,5.69 0,3.59 -2.46,6.27 -7.1,6.27 -3.77,0 -7.31,-2.14 -7.26,-6.95 z"/><polygon fill="#1a3682" points="101.11,51.29 101.11,56.08 110.31,56.08 110.31,59.69 97.36,59.69 97.36,40.15 110.11,40.15 110.11,43.76 101.11,43.76 101.11,47.95 109.37,47.95 109.37,51.29"/><path fill="#1a3682" d="m 115.2,43.49 h 4.11 c 1.67,0 2.58,0.82 2.58,2.71 0,1.89 -0.89,2.8 -2.58,2.8 h -4.11 z m -3.75,16.2 h 3.75 v -7.63 h 3.8 c 1.89,0 2.58,0.9 2.84,2.95 a 25.59,25.59 0 0 0 0.6,4.68 h 3.75 c -0.67,-1.09 -0.64,-3.39 -0.71,-4.62 -0.12,-2 -0.65,-4 -2.49,-4.57 v -0.06 c 1.89,-0.87 2.7,-2.6 2.7,-4.9 0,-2.95 -1.93,-5.39 -5,-5.39 h -9.2 z"/></svg></svg>`;

dachserCode = dachserCode.replace(/inlineSvg:\s*"[^"]*",/s, `inlineSvg: ${JSON.stringify(dachserInline)},`);
fs.writeFileSync(dachserPath, dachserCode);

// 3. Planzer:
// Current inlineSvg had fill="#a60d1f" (dark red) on top of background "#c4121a" (bright red)! Dark red on bright red is completely invisible.
// White letters on red background make Planzer instantly clear and striking.
const planzerPath = path.join(carriersDir, 'planzer.ts');
let planzerCode = fs.readFileSync(planzerPath, 'utf8');
const planzerInline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" rx="3" fill="#c4121a"/><svg x="8" y="4" width="84" height="16" viewBox="20 394 760 122" preserveAspectRatio="xMidYMid meet"><g id="layer1"><path fill="#ffffff" d="m 585.79,479.47 c -9.7,0 -9.09,-10.31 -9.09,-10.31 l 23.04,0 0,-26.68 -66.08,0 0,38.8 c 0,16.37 12.73,28.5 29.1,28.5 l 68.51,0 0,-30.31 -45.47,0 z m 132.77,-15.16 c 16.98,-1.21 20.61,-9.09 20.61,-33.34 0,-23.65 -6.06,-31.53 -23.64,-31.53 l -73.97,0 0,31.53 52.14,0 c 3.03,0 6.06,2.42 6.06,6.06 0,3.03 -2.42,6.06 -6.06,6.06 l -52.14,0 0,67.9 43.05,0 0,-36.37 11.52,16.97 0,18.8 56.38,0 -33.95,-46.08 z M 520.92,427.94 c 1.82,-4.25 1.82,-7.28 1.82,-14.55 0,-12.73 -2.43,-13.95 -10.31,-13.95 l -90.94,0 0,31.53 44.86,0 -39.4,41.83 c -1.82,2.42 -9.7,8.49 -9.7,18.19 0,3.64 0,7.27 0,10.91 0,7.28 0.6,8.49 10.3,8.49 l 93.37,0 0,-30.31 -44.26,0 35.77,-40 c 1.82,-3.04 7.28,-9.1 8.49,-12.13 z m -389.23,41.83 0,-70.33 -43.65,0 0,83.67 c 0,21.22 10.31,27.28 29.1,27.28 l 46.08,0 0,-30.31 -22.43,0 c -6.06,-0.61 -9.1,-5.46 -9.1,-10.31 z m -79.42,-70.33 -73.36,0 0,31.53 50.93,0 c 3.03,0 6.06,2.42 6.06,6.06 0,3.03 -2.43,6.06 -6.06,6.06 l -50.93,0 0,67.9 43.65,0 0,-35.77 29.71,0 c 18.19,0 26.67,-14.55 26.07,-39.41 0,-27.89 -7.88,-36.38 -26.07,-36.38 z M 374.2,443.09 339.64,403.08 c -1.82,-2.42 -5.45,-3.64 -8.48,-3.64 l -21.83,0 c -4.85,0 -6.06,1.82 -6.06,6.06 l 0,104.89 33.95,0 0,-49.11 15.76,18.19 0,31.53 26.07,0 c 23.65,0 29.1,-9.7 29.1,-27.89 l 0,-83.67 -33.95,0 0,43.65 z m 159.45,-43.65 94.58,0 0,31.53 -94.58,0 z m -289.8,0 -23.04,0 c -3.03,0 -6.06,0.61 -9.09,7.88 l -42.44,103.07 56.99,0 0,-49.72 c 0,-3.03 2.42,-6.06 6.06,-6.06 3.03,0 6.06,2.43 6.06,6.06 l 0,49.72 56.99,0 -42.44,-103.07 c -3.03,-7.27 -5.46,-7.88 -9.09,-7.88 z"/></g></svg></svg>`;

planzerCode = planzerCode.replace(/inlineSvg:\s*"[^"]*",/s, `inlineSvg: ${JSON.stringify(planzerInline)},`);
fs.writeFileSync(planzerPath, planzerCode);

// 4. TNT:
// The TNT SVG has 3 orange circles connected by an orange shape with negative white space for "T", "N", "T".
// When drawn on orange background #ff6600, it disappeared into an orange block!
// For the inline badge:
// Background is white with subtle border (like FedEx/GLS), inside is the iconic TNT 3-circles logo in bright orange #ff6600 with white letters!
// Or on orange background, white circles with orange letters. But the official brand mark is orange badge with white letters on white/light background.
const tntPath = path.join(carriersDir, 'tnt.ts');
let tntCode = fs.readFileSync(tntPath, 'utf8');
const tntInline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" rx="3" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/><svg x="10" y="3" width="80" height="18" viewBox="0 0 595.32 215.4" preserveAspectRatio="xMidYMid meet"><path fill="#ff6600" d="M338.88,59.28a2.97,2.97,0,0,1,3,3v91.08a2.72,2.72,0,0,1-2.76,2.76H320.28a5.86,5.86,0,0,1-3.24-1.56s-33.84-46.44-34.92-47.64a21.83,21.83,0,0,1-2.28-4.32v50.76a2.75,2.75,0,0,1-2.88,2.76H255.84a2.75,2.75,0,0,1-2.88-2.76V62.28a2.75,2.75,0,0,1,2.88-2.76h18.84a5.19,5.19,0,0,1,3.12,1.56s33.48,45.6,34.92,47.64a25.56,25.56,0,0,1,2.4,4.32V62.28a2.72,2.72,0,0,1,2.76-2.76C317.88,59.28,337.56,59.28,338.88,59.28Zm148.8,131.88c-45.84,0-83.16-37.44-83.16-83.4,0-46.08,37.32-83.52,83.16-83.52,45.72,0,83.04,37.44,83.04,83.52C570.72,153.72,533.4,191.16,487.68,191.16Zm-190.2,0c-45.84,0-83.16-37.44-83.16-83.4,0-46.08,37.32-83.52,83.16-83.52,45.72,0,83.04,37.44,83.04,83.52C380.52,153.72,343.2,191.16,297.48,191.16Zm-190.2,0c-45.84,0-83.16-37.44-83.16-83.4,0-46.08,37.32-83.52,83.16-83.52,45.72,0,83.04,37.44,83.04,83.52C190.2,153.72,152.88,191.16,107.28,191.16ZM487.68,0C446.4,0,410.52,23.64,392.4,58.08a107,107,0,0,0-190.32,0A107.31,107.31,0,0,0,106.8,0C48.12,0,0,48.36,0,107.76,0,167.04,48.12,215.4,107.28,215.4c41.16,0,77.16-23.64,95.16-58.08A107.26,107.26,0,0,0,297.6,215.4c41.28,0,77.16-23.64,95.28-58.08a107.12,107.12,0,0,0,95.16,58.08c59.16,0,107.28-48.36,107.28-107.64C594.96,48.36,546.72,0,487.68,0ZM66.96,61.08a2.72,2.72,0,0,0-2.76,2.76V81.96a2.72,2.72,0,0,0,2.76,2.76H88.8a27.45,27.45,0,0,0,4.2-.36v71.4a2.72,2.72,0,0,0,2.76,2.76H118.2a2.72,2.72,0,0,0,2.76-2.76V84.36a47.59,47.59,0,0,0,5.28.36h20.88a2.72,2.72,0,0,0,2.76-2.76V63.84a2.72,2.72,0,0,0-2.76-2.76Zm460.92,0a2.72,2.72,0,0,1,2.76,2.76V81.96a2.72,2.72,0,0,1-2.76,2.76H507.12a48.23,48.23,0,0,1-5.4-.36v71.4a2.72,2.72,0,0,1-2.76,2.76H476.52a2.72,2.72,0,0,1-2.76-2.76V84.36a27.45,27.45,0,0,1-4.2.36H447.72a2.72,2.72,0,0,1-2.76-2.76V63.84a2.72,2.72,0,0,1,2.76-2.76Z"/></svg></svg>`;

tntCode = tntCode.replace(/inlineSvg:\s*"[^"]*",/s, `inlineSvg: ${JSON.stringify(tntInline)},`);
fs.writeFileSync(tntPath, tntCode);

// 5. 24plus:
// The subline "logistics network" was in path14-path44 (scale(0.1)).
// The actual big "24" and "plus" are in path46, path48, path50, path52, path54, path56!
// Removing the unreadable tiny subline text and centering the big bold "24" and "plus" makes it dramatically clearer!
// Let's create an inline badge focused on the big 24 (blue) and plus (red), perfectly centered and readable.
const twentyFourPlusPath = path.join(carriersDir, 'twentyFourPlus.ts');
let twentyFourPlusCode = fs.readFileSync(twentyFourPlusPath, 'utf8');
// Notice in inkscape transform matrix(1.3333333,0,0,-1.3333333,0,88) scale(0.1):
// The 24 is from x=9 to x=560, y=247 to 645
// The plus is from x=607 to 1230, y=192 to 482
// Total width of "24plus" mark: ~0 to 1250, height: 180 to 650
// In original coordinates with scale(0.1): width 125, height 50
const twentyFourInline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/><svg x="10" y="3" width="80" height="18" viewBox="0 0 1250 500" preserveAspectRatio="xMidYMid meet"><g transform="matrix(1,0,0,-1,0,500)"><path d="M 9.18,100 H 293.1 v 67.9 H 119.43 l 88.91,72.21 c 67.57,54.43 84.77,94.84 84.77,135.79 0,65.2 -55.13,130.94 -144.63,130.94 -91.28,0 -144.04,-68.97 -144.04,-132.02 0,-4.31 0,-7.54 0.59,-12.93 H 83.27 c 0,15.63 0.59,31.25 8.3,44.73 8.89,14.55 27.86,32.33 58.68,32.33 29.64,0 64.02,-17.79 64.02,-59.82 0,-18.32 -5.34,-42.03 -48.61,-78.67 L 9.18,167.9 V 100" fill="#035094"/><path d="m 301.3,218.55 v -58.73 h 189.09 v -59.82 h 78.84 v 59.82 h 46.23 v 67.9 h -46.23 v 271.05 h -66.39 z m 84.76,9.16 103.14,149.8 h 1.19 V 227.71 H 386.06" fill="#035094"/><path d="m 607.5,45.57 h 43.75 l 14.88,74.56 c 9.45,-10.34 20.89,-22.25 51.81,-22.25 51.65,0 99.83,41.98 110.09,93.36 8.57,42.92 -13.19,92.11 -73.06,92.11 -8.55,0 -37.5,0 -64.47,-26.32 h -0.66 l 4.07,20.36 H 653.78 z m 70.08,145.05 c 6.69,33.52 37.53,54.51 64.83,54.51 26.97,0 48.13,-22.55 41.75,-54.51 -7.13,-35.72 -40.82,-54.51 -64.17,-54.51 -20.73,0 -50.1,15.98 -42.41,54.51" fill="#ab031d"/><path d="m 829.71,103.53 h 43.75 l 46.28,231.84 h -43.75 L 829.71,103.53" fill="#ab031d"/><path d="m 1048.14,277.4 -17.76,-88.97 c -5.51,-27.57 -19.66,-52.32 -47.29,-52.32 -38.16,0 -30.47,38.54 -27.65,52.63 l 17.7,88.66 h -43.75 l -18.14,-90.85 c -2.88,-14.41 -8.51,-42.61 1.29,-61.09 6.84,-11.91 22.46,-27.57 55.68,-27.57 27.96,0 42.55,13.79 51.67,23.18 h 0.65 l -3.5,-17.54 h 40.14 l 34.71,173.88 h -43.75" fill="#ab031d"/><path d="m 1225.71,230.1 c 5.23,34.46 -21.61,53.26 -48.91,53.26 -29.28,0 -65.19,-20.05 -71.94,-53.89 -5.7,-28.51 11.43,-43.23 30.84,-49.81 29.25,-10.02 38.5,-13.16 35.93,-26 -1.44,-7.2 -9.09,-17.54 -23.24,-17.54 -18.09,0 -19.16,14.41 -19.57,22.24 h -44.74 c -1.14,-10.65 -2.25,-24.43 6.31,-37.59 10.77,-16.92 31.95,-22.87 50.04,-22.87 31.25,0 68.13,21.62 75.95,60.78 7.01,35.09 -19.22,45.43 -40.6,52 -21.92,7.21 -29.05,9.4 -27.05,19.43 1.44,7.2 8.93,15.04 19.78,15.04 4.61,0 14.22,-1.25 14.44,-15.04 h 42.76" fill="#ab031d"/></g></svg></svg>`;

twentyFourPlusCode = twentyFourPlusCode.replace(/inlineSvg:\s*"[^"]*",/s, `inlineSvg: ${JSON.stringify(twentyFourInline)},`);
fs.writeFileSync(twentyFourPlusPath, twentyFourPlusCode);

// 6. Manual carrier:
// User said: "Manual is ok, but real logo is not readable"
// Currently real logo is:
// svg: "<svg ... fill="none" stroke="currentColor" ...><rect ...></svg>"
// In the docs preview, .real-logo-container has a white background (#ffffff), so stroke="currentColor" on white rendered invisible or faint light gray!
// Also the icon was tiny.
// Let's make manual real SVG have explicit dark slate stroke (#334155), fill the truck nicely, with clear dimensions and aesthetics!
const manualPath = path.join(carriersDir, 'manual.ts');
let manualCode = fs.readFileSync(manualPath, 'utf8');
const manualSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none"><rect x="4" y="10" width="36" height="32" rx="3" fill="#e2e8f0" stroke="#334155" stroke-width="4"/><path d="M40 22h12l8 10v10h-20V22z" fill="#cbd5e1" stroke="#334155" stroke-width="4" stroke-linejoin="round"/><circle cx="16" cy="46" r="6" fill="#475569" stroke="#334155" stroke-width="4"/><circle cx="48" cy="46" r="6" fill="#475569" stroke="#334155" stroke-width="4"/><path d="M44 26h8l4 6h-12v-6z" fill="#94a3b8"/></svg>`;

manualCode = manualCode.replace(/svg:\s*"[^"]*",/s, `svg: ${JSON.stringify(manualSvg)},`);
fs.writeFileSync(manualPath, manualCode);

console.log('Successfully updated Swiss Post, Dachser, Planzer, TNT, 24plus, and Manual carrier logos!');
