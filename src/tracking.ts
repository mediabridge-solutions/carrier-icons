import { CarrierDefinition } from './types';
import { listCarriers } from './registry';

/**
 * Generate tracking URL for a carrier and tracking number.
 * Returns null if tracking is not supported or no tracking number is given.
 */
export function getTrackingUrl(
  carrier: CarrierDefinition | null | undefined,
  trackingNumber: string | null | undefined,
  postalCode?: string | null
): string | null {
  if (!carrier || !trackingNumber || !carrier.tracking?.urlTemplate) {
    return null;
  }

  const cleanTracking = encodeURIComponent(String(trackingNumber).trim());
  let url = carrier.tracking.urlTemplate.replace('{trackingNumber}', cleanTracking);

  if (postalCode && url.includes('{postalCode}')) {
    url = url.replace('{postalCode}', encodeURIComponent(String(postalCode).trim()));
  }

  return url;
}

/**
 * The carrier a tracking number belongs to, judged by its format alone (CarrierTrackingConfig
 * numberPatterns). Returns null when no carrier or more than one carrier matches, so callers can
 * rely on a non-null answer.
 */
export function detectCarrierByTrackingNumber(trackingNumber: string | null | undefined): CarrierDefinition | null {
  const value = String(trackingNumber || '').replace(/\s+/g, '').toUpperCase();
  if (!value) return null;
  const matches = listCarriers().filter((carrier) =>
    (carrier.tracking?.numberPatterns || []).some((pattern) => new RegExp(pattern).test(value)));
  return matches.length === 1 ? matches[0] : null;
}
