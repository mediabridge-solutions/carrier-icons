import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');

console.log('[build] Compiling TypeScript...');
execSync('npx tsc -p tsconfig.json', { cwd: root, stdio: 'inherit' });

// Bundle into a clean single-file ESM dist/index.mjs for bundlers (Vite, Rollup, Webpack)
const cjsEntry = path.join(dist, 'index.js');
const mjsEntry = path.join(dist, 'index.mjs');

// Create ESM wrapper that re-exports CJS module cleanly
const esmWrapper = `import pkg from './index.js';
export const {
  getCarrier,
  hasCarrier,
  listCarriers,
  registerCarrier,
  generateFallbackColors,
  getTrackingUrl,
  renderCarrierBadgeElement,
  renderCarrierBadgesElement,
  dhl,
  kleine,
  dpd,
  ups,
  fedex,
  gls,
  swissPost,
  postAt,
  deutschePost,
  hermes,
  dachser,
  dbSchenker,
  gebruederWeiss,
  planzer,
  tnt,
  twentyFourPlus,
  manual
} = pkg;
export default pkg;
`;

fs.writeFileSync(mjsEntry, esmWrapper, 'utf8');
console.log('[build] Generated dist/index.mjs');
console.log('[build] Build completed successfully.');
