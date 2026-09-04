import { CarrierDefinition } from './types';
/**
 * Register a carrier or add a custom carrier definition.
 */
export declare function registerCarrier(carrier: CarrierDefinition): void;
/**
 * Look up a carrier definition by code, slug, or alias.
 * If not found, returns a safe synthesized fallback carrier object.
 */
export declare function getCarrier(identifier?: string | null): CarrierDefinition;
/**
 * Check whether a carrier code or alias is recognized in the official registry.
 */
export declare function hasCarrier(identifier?: string | null): boolean;
/**
 * Returns all officially registered carrier definitions.
 */
export declare function listCarriers(): CarrierDefinition[];
//# sourceMappingURL=registry.d.ts.map