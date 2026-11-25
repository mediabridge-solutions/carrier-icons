import { CarrierDefinition } from './types';
/**
 * Generate tracking URL for a carrier and tracking number.
 * Returns null if tracking is not supported or no tracking number is given.
 */
export declare function getTrackingUrl(carrier: CarrierDefinition | null | undefined, trackingNumber: string | null | undefined, postalCode?: string | null): string | null;
/**
 * The carrier a tracking number belongs to, judged by its format alone (CarrierTrackingConfig
 * numberPatterns). Returns null when no carrier or more than one carrier matches, so callers can
 * rely on a non-null answer.
 */
export declare function detectCarrierByTrackingNumber(trackingNumber: string | null | undefined): CarrierDefinition | null;
//# sourceMappingURL=tracking.d.ts.map