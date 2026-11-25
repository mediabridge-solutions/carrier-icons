"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrackingUrl = getTrackingUrl;
exports.detectCarrierByTrackingNumber = detectCarrierByTrackingNumber;
const registry_1 = require("./registry");
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
/**
 * The carrier a tracking number belongs to, judged by its format alone (CarrierTrackingConfig
 * numberPatterns). Returns null when no carrier or more than one carrier matches, so callers can
 * rely on a non-null answer.
 */
function detectCarrierByTrackingNumber(trackingNumber) {
    const value = String(trackingNumber || '').replace(/\s+/g, '').toUpperCase();
    if (!value)
        return null;
    const matches = (0, registry_1.listCarriers)().filter((carrier) => (carrier.tracking?.numberPatterns || []).some((pattern) => new RegExp(pattern).test(value)));
    return matches.length === 1 ? matches[0] : null;
}
//# sourceMappingURL=tracking.js.map