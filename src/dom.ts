import { CarrierDefinition, RenderBadgeOptions } from './types';
import { getCarrier } from './registry';

/**
 * Render a lightweight DOM badge element for vanilla JS and table renderers (e.g. ag-Grid, Datatables).
 * Framework-agnostic: returns standard HTMLElement.
 */
export function renderCarrierBadgeElement(
  identifier?: string | null,
  options: RenderBadgeOptions = {}
): HTMLElement | string {
  if (!identifier) {
    return '—';
  }

  const carrier = getCarrier(identifier);
  const span = document.createElement('span');

  span.className = `carrier-badge ${options.className || ''}`.trim();
  span.setAttribute('data-carrier', carrier.code);
  span.setAttribute('data-category', carrier.category);
  span.setAttribute('title', carrier.name);

  // Determine sizing
  const pad = options.size === 'sm' ? '1px 6px' : options.size === 'lg' ? '4px 12px' : '2px 8px';
  const fontSize = options.size === 'sm' ? '11px' : options.size === 'lg' ? '14px' : '12px';

  Object.assign(span.style, {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: carrier.colors.bg,
    color: carrier.colors.fg,
    padding: pad,
    borderRadius: '4px',
    fontSize,
    fontWeight: '700',
    letterSpacing: '0.02em',
    lineHeight: '1.2',
    userSelect: 'none',
    boxSizing: 'border-box',
    border: carrier.colors.border ? `1px solid ${carrier.colors.border}` : 'none',
    ...(options.style || {}),
  });

  if (options.showIcon) {
    const iconSvg = options.logoType === 'real' ? carrier.svg : (carrier.inlineSvg || carrier.svg);
    if (iconSvg) {
      const iconContainer = document.createElement('span');
      iconContainer.style.display = 'inline-flex';
      iconContainer.style.alignItems = 'center';
      iconContainer.style.justifyContent = 'center';
      iconContainer.style.marginRight = '6px';
      iconContainer.innerHTML = iconSvg;
      span.appendChild(iconContainer);
    }
  }

  const textNode = document.createTextNode(carrier.label);
  span.appendChild(textNode);

  return span;
}

/**
 * Render multiple carrier badges (e.g. for orders with multiple delivery packages).
 */
export function renderCarrierBadgesElement(
  identifiers?: string[] | null,
  options: RenderBadgeOptions = {}
): HTMLElement | string {
  if (!identifiers || !identifiers.length) {
    return '—';
  }

  const unique = Array.from(new Set(identifiers.filter(Boolean)));
  if (!unique.length) return '—';

  const container = document.createElement('span');
  container.className = 'carrier-badges-group';
  container.style.display = 'inline-flex';
  container.style.flexWrap = 'wrap';
  container.style.gap = '4px';

  for (const id of unique) {
    const el = renderCarrierBadgeElement(id, options);
    if (typeof el === 'object') {
      container.appendChild(el);
    }
  }

  return container;
}
