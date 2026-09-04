"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planzer = void 0;
exports.planzer = {
    code: 'planzer',
    name: 'Planzer Transport',
    label: 'Planzer',
    category: 'freight',
    country: 'CH',
    aliases: ['planzer_paket', 'planzer_transporte'],
    colors: {
        bg: '#e30613',
        fg: '#ffffff',
        border: '#b8050f',
    },
    tracking: {
        urlTemplate: 'https://www.planzer.ch/de/sendungsverfolgung/?track={trackingNumber}',
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#E30613" rx="3"/><text x="50" y="16" fill="#FFFFFF" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="900" font-size="12" text-anchor="middle" letter-spacing="1">PLANZER</text></svg>`,
};
//# sourceMappingURL=planzer.js.map