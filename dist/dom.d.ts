import { RenderBadgeOptions } from './types';
/**
 * Render a lightweight DOM badge element for vanilla JS and table renderers (e.g. ag-Grid, Datatables).
 * Framework-agnostic: returns standard HTMLElement.
 */
export declare function renderCarrierBadgeElement(identifier?: string | null, options?: RenderBadgeOptions): HTMLElement | string;
/**
 * Render multiple carrier badges (e.g. for orders with multiple delivery packages).
 */
export declare function renderCarrierBadgesElement(identifiers?: string[] | null, options?: RenderBadgeOptions): HTMLElement | string;
//# sourceMappingURL=dom.d.ts.map