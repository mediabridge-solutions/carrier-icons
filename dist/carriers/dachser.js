"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dachser = void 0;
exports.dachser = {
    code: 'dachser',
    name: 'Dachser Intelligent Logistics',
    label: 'Dachser',
    category: 'freight',
    country: 'DE',
    aliases: ['dachser_se', 'dachser_spedition'],
    colors: {
        bg: '#002f6c',
        fg: '#ffcc00',
        border: '#001d43',
    },
    tracking: {
        urlTemplate: 'https://www.dachser.de/de/sendungsverfolgung-364?tracking_number={trackingNumber}',
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#002F6C" rx="3"/><text x="50" y="16" fill="#FFCC00" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="900" font-size="12" text-anchor="middle" letter-spacing="1">DACHSER</text></svg>`,
};
//# sourceMappingURL=dachser.js.map