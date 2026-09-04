"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrackingUrl = getTrackingUrl;
/**
 * Generate tracking URL for a carrier and tracking number.
 * Returns null if tracking is not supported or no tracking number is given.
 */
function getTrackingUrl(carrier, trackingNumber, postalCode) {
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
//# sourceMappingURL=tracking.js.map