import { CarrierColors } from './types';

/**
 * Generate a deterministic brand-like color from an arbitrary carrier string.
 * Ensures good contrast (white text on dark/medium backgrounds).
 */
export function generateFallbackColors(input: string): CarrierColors {
  const str = input.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  // Generate HSL: hue from hash, saturated (55-80%), medium-dark lightness (30-45%)
  const h = Math.abs(hash) % 360;
  const s = 60 + (Math.abs(hash >> 3) % 25);
  const l = 32 + (Math.abs(hash >> 6) % 15);

  const hex = hslToHex(h, s, l);
  const borderHex = hslToHex(h, s, Math.max(15, l - 10));

  return {
    bg: hex,
    fg: '#ffffff',
    border: borderHex,
  };
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
