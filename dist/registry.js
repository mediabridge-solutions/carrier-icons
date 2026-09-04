"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCarrier = registerCarrier;
exports.getCarrier = getCarrier;
exports.hasCarrier = hasCarrier;
exports.listCarriers = listCarriers;
const colors_1 = require("./colors");
const carrierModules = __importStar(require("./carriers"));
const REGISTRY = new Map();
const ALIAS_MAP = new Map();
// Initialize registry with all predefined carriers
for (const key of Object.keys(carrierModules)) {
    const item = carrierModules[key];
    if (item && item.code) {
        registerCarrier(item);
    }
}
/**
 * Register a carrier or add a custom carrier definition.
 */
function registerCarrier(carrier) {
    const code = carrier.code.toLowerCase();
    REGISTRY.set(code, carrier);
    ALIAS_MAP.set(code, code);
    if (carrier.aliases) {
        for (const alias of carrier.aliases) {
            ALIAS_MAP.set(alias.toLowerCase(), code);
        }
    }
}
/**
 * Look up a carrier definition by code, slug, or alias.
 * If not found, returns a safe synthesized fallback carrier object.
 */
function getCarrier(identifier) {
    if (!identifier) {
        return REGISTRY.get('manual');
    }
    const raw = String(identifier).trim().toLowerCase();
    const canonicalCode = ALIAS_MAP.get(raw) || raw;
    if (REGISTRY.has(canonicalCode)) {
        return REGISTRY.get(canonicalCode);
    }
    // Attempt fuzzy / substring matching (e.g. "dhl paket int" -> "dhl")
    for (const [alias, code] of ALIAS_MAP.entries()) {
        if (raw.includes(alias) && alias.length >= 3) {
            return REGISTRY.get(code);
        }
    }
    // Synthesize a graceful fallback so apps never crash
    const label = identifier
        .split(/[\s_-]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    const colors = (0, colors_1.generateFallbackColors)(raw);
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="${colors.bg}" rx="3"/><text x="50" y="16" fill="${colors.fg}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="700" font-size="11" text-anchor="middle" letter-spacing="1">${escapeXml(label.slice(0, 10).toUpperCase())}</text></svg>`;
    const fallback = {
        code: raw,
        name: label,
        label,
        category: 'manual',
        colors,
        svg: fallbackSvg,
        inlineSvg: fallbackSvg,
    };
    return fallback;
}
/**
 * Check whether a carrier code or alias is recognized in the official registry.
 */
function hasCarrier(identifier) {
    if (!identifier)
        return false;
    const raw = String(identifier).trim().toLowerCase();
    return ALIAS_MAP.has(raw);
}
/**
 * Returns all officially registered carrier definitions.
 */
function listCarriers() {
    return Array.from(REGISTRY.values());
}
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}
//# sourceMappingURL=registry.js.map