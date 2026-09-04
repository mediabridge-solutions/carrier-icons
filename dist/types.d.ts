export type CarrierCategory = 'parcel' | 'freight' | 'postal' | 'express' | 'manual';
export interface CarrierColors {
    /** Background color in HEX format, e.g. #ffcc00 */
    bg: string;
    /** Foreground/text color in HEX format, e.g. #d40511 */
    fg: string;
    /** Optional border color */
    border?: string;
}
export interface CarrierTrackingConfig {
    /** URL template where {trackingNumber} and {postalCode} will be replaced */
    urlTemplate?: string;
    /** Description or instructions */
    description?: string;
}
export interface CarrierDefinition {
    /** Canonical unique identifier, lowercase slug, e.g. 'dhl', 'kleine', 'dpd' */
    code: string;
    /** Standard human-readable display name, e.g. 'DHL Paket' */
    name: string;
    /** Short brand label, e.g. 'DHL', 'Kleine', 'DPD' */
    label: string;
    /** Service category */
    category: CarrierCategory;
    /** Official brand color scheme */
    colors: CarrierColors;
    /** Optional ISO 3166-1 alpha-2 origin country code (e.g. 'DE', 'CH', 'AT') */
    country?: string;
    /** Array of recognized aliases / alternative codes (e.g. ['dhl_express', 'deutsche_post_dhl']) */
    aliases?: string[];
    /** Pure vector SVG string (optimized) */
    svg?: string;
    /** Standardized 100x24 inline badge SVG string */
    inlineSvg?: string;
    /** Tracking configuration */
    tracking?: CarrierTrackingConfig;
}
export interface RenderBadgeOptions {
    /** CSS class to append */
    className?: string;
    /** Include SVG logo inside the badge if available (defaults to false for plain badge) */
    showIcon?: boolean;
    /** Logo variant to render: 'inline' (100x24 standardized) or 'real' (original vector SVG). Defaults to 'inline' */
    logoType?: 'inline' | 'real';
    /** Size variant: 'sm' | 'md' | 'lg' (defaults to 'md') */
    size?: 'sm' | 'md' | 'lg';
    /** Extra inline styles */
    style?: Record<string, string>;
}
//# sourceMappingURL=types.d.ts.map