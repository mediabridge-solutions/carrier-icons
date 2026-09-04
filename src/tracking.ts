import { CarrierDefinition } from './types';

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
