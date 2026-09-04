import { CarrierDefinition } from './types';
import { generateFallbackColors } from './colors';
import * as carrierModules from './carriers';

const REGISTRY = new Map<string, CarrierDefinition>();
const ALIAS_MAP = new Map<string, string>();

// Initialize registry with all predefined carriers
for (const key of Object.keys(carrierModules)) {
  const item = (carrierModules as Record<string, CarrierDefinition>)[key];
  if (item && item.code) {
    registerCarrier(item);
  }
}

/**
 * Register a carrier or add a custom carrier definition.
 */
export function registerCarrier(carrier: CarrierDefinition): void {
  const code = carrier.code.toLowerCase();
  REGISTRY.set(code, carrier);
  ALIAS_MAP.set(code, code);

  if (carrier.aliases) {
    for (const alias of carrier.aliases) {
      ALIAS_MAP.set(alias.toLowerCase(), code);
    }
  }
}

/**
 * Look up a carrier definition by code, slug, or alias.
 * If not found, returns a safe synthesized fallback carrier object.
 */
export function getCarrier(identifier?: string | null): CarrierDefinition {
  if (!identifier) {
    return REGISTRY.get('manual')!;
  }

  const raw = String(identifier).trim().toLowerCase();
  const canonicalCode = ALIAS_MAP.get(raw) || raw;

  if (REGISTRY.has(canonicalCode)) {
    return REGISTRY.get(canonicalCode)!;
  }

  // Attempt fuzzy / substring matching (e.g. "dhl paket int" -> "dhl")
  for (const [alias, code] of ALIAS_MAP.entries()) {
    if (raw.includes(alias) && alias.length >= 3) {
      return REGISTRY.get(code)!;
    }
  }

  // Synthesize a graceful fallback so apps never crash
  const label = identifier
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const colors = generateFallbackColors(raw);

  const fallback: CarrierDefinition = {
    code: raw,
    name: label,
    label,
    category: 'manual',
    colors,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="${colors.bg}" rx="3"/><text x="50" y="16" fill="${colors.fg}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="700" font-size="11" text-anchor="middle" letter-spacing="1">${escapeXml(label.slice(0, 10).toUpperCase())}</text></svg>`,
  };

  return fallback;
}

/**
 * Check whether a carrier code or alias is recognized in the official registry.
 */
export function hasCarrier(identifier?: string | null): boolean {
  if (!identifier) return false;
  const raw = String(identifier).trim().toLowerCase();
  return ALIAS_MAP.has(raw);
}

/**
 * Returns all officially registered carrier definitions.
 */
export function listCarriers(): CarrierDefinition[] {
  return Array.from(REGISTRY.values());
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
