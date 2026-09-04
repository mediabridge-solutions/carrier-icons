"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fedex = void 0;
exports.fedex = {
    code: 'fedex',
    name: 'FedEx',
    label: 'FedEx',
    category: 'express',
    country: 'US',
    aliases: ['federal_express'],
    colors: {
        bg: '#4d148c',
        fg: '#ff6600',
        border: '#3c0f6d',
    },
    tracking: {
        urlTemplate: 'https://www.fedex.com/fedextrack/?trknbr={trackingNumber}',
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#4D148C" rx="3"/><text x="40" y="17" fill="#FFFFFF" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="900" font-size="13" text-anchor="middle">Fed</text><text x="65" y="17" fill="#FF6600" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="900" font-size="13" text-anchor="middle">Ex</text></svg>`,
};
//# sourceMappingURL=fedex.js.map