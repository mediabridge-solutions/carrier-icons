import { CarrierDefinition } from './types';
/**
 * Generate tracking URL for a carrier and tracking number.
 * Returns null if tracking is not supported or no tracking number is given.
 */
export declare function getTrackingUrl(carrier: CarrierDefinition | null | undefined, trackingNumber: string | null | undefined, postalCode?: string | null): string | null;
//# sourceMappingURL=tracking.d.ts.map