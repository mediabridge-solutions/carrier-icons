# @mediabridge-solutions/carrier-icons

Platform-agnostic, lightweight vector icons, official brand palettes, tracking URLs, and metadata for shipping carriers, parcel networks, and freight logistics forwarders.

Designed for e-commerce shops, warehouse management systems (WMS), transport management systems (TMS), ERPs, and delivery tracking dashboards.

---

## Features

- **Platform & Framework Agnostic**: Zero runtime dependencies. Runs in Node.js, modern browsers, vanilla JavaScript, Vue, React, Svelte, Angular, and SSR.
- **Logistics & Freight Coverage**: Covers global parcel couriers (DHL, UPS, FedEx, DPD, GLS) as well as European regional postal services and freight/pallet networks (Kleine/24plus, Dachser, DB Schenker, Gebrüder Weiss, Planzer, Swiss Post, Österreichische Post).
- **Brand Colors & SVGs**: Includes official brand background/foreground colors and clean vector SVGs.
- **Dynamic Fallbacks**: Unknown or unmapped carrier codes automatically generate deterministic contrast badges and fallback SVGs, guaranteeing that user interfaces never crash or display broken layouts.
- **Tracking URL Resolver**: Built-in tracking URL templates with parameter replacement (`{trackingNumber}`, `{postalCode}`).
- **Native DOM Renderers**: Includes agnostic `renderCarrierBadgeElement()` helpers for direct use in high-performance data tables (such as ag-Grid, Datatables, or virtual lists).
- **TypeScript First**: Full type safety with complete declaration files (`.d.ts`), CJS (`dist/index.js`), and ESM (`dist/index.mjs`) builds.

---

## Installation

```bash
npm install @mediabridge-solutions/carrier-icons
# or
yarn add @mediabridge-solutions/carrier-icons
# or
pnpm add @mediabridge-solutions/carrier-icons
```

---

## Usage

### 1. Basic Carrier Lookup & Metadata

```typescript
import { getCarrier, hasCarrier } from '@mediabridge-solutions/carrier-icons';

// Check if a carrier is officially supported
console.log(hasCarrier('dhl')); // true
console.log(hasCarrier('24plus')); // true (recognized via alias)

// Look up carrier details
const carrier = getCarrier('dhl');
console.log(carrier);
/*
{
  code: 'dhl',
  name: 'DHL Paket',
  label: 'DHL',
  category: 'parcel',
  country: 'DE',
  colors: {
    bg: '#ffcc00',
    fg: '#d40511',
    border: '#e6b800'
  },
  svg: '<svg ...>...</svg>',
  tracking: {
    urlTemplate: 'https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode={trackingNumber}'
  }
}
*/
```

### 2. Unknown Carrier Graceful Fallback

If an arbitrary forwarder or custom code is passed, `@mediabridge-solutions/carrier-icons` will never return `undefined` or null SVG. It produces a crisp, deterministic color-hashed badge and SVG:

```typescript
import { getCarrier } from '@mediabridge-solutions/carrier-icons';

const regionalLogistics = getCarrier('spedition_mueller_gmbh');
console.log(regionalLogistics);
/*
{
  code: 'spedition_mueller_gmbh',
  name: 'spedition_mueller_gmbh',
  label: 'SP',
  category: 'custom',
  isFallback: true,
  colors: { bg: '#...', fg: '#ffffff', border: '#...' },
  svg: '<svg ... fallback initials badge ... </svg>'
}
*/
```

### 3. Tracking URL Generator

```typescript
import { getCarrier, getTrackingUrl } from '@mediabridge-solutions/carrier-icons';

const dhl = getCarrier('dhl');
const trackingUrl = getTrackingUrl(dhl, '00340434123456789012');
// https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode=00340434123456789012
```

### 4. Direct DOM Elements (ag-Grid, Vanilla JS, Table Renderers)

```typescript
import { renderCarrierBadgeElement, renderCarrierBadgesElement } from '@mediabridge-solutions/carrier-icons';

// Single badge element
const badgeEl = renderCarrierBadgeElement('dhl', { size: 'sm' });
document.getElementById('carrier-cell').appendChild(badgeEl);

// ag-Grid Cell Renderer example
const columnDefs = [
  {
    field: 'carrier',
    headerName: 'Carrier',
    cellRenderer: (params) => renderCarrierBadgeElement(params.value),
  },
  {
    field: 'splitCarriers',
    headerName: 'Carriers',
    cellRenderer: (params) => renderCarrierBadgesElement(params.value), // renders multiple pills
  }
];
```

### 5. Vue 3 Integration Example

```vue
<template>
  <span
    class="carrier-badge"
    :style="{ backgroundColor: carrier.colors.bg, color: carrier.colors.fg }"
  >
    <span v-if="showIcon" class="carrier-icon" v-html="carrier.svg" />
    {{ carrier.label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getCarrier } from '@mediabridge-solutions/carrier-icons';

const props = defineProps<{ carrierCode: string; showIcon?: boolean }>();
const carrier = computed(() => getCarrier(props.carrierCode));
</script>
```

---

## Supported Carriers (Initial Release)

| Code | Carrier Name | Category | Country | Aliases |
| :--- | :--- | :--- | :--- | :--- |
| `dhl` | DHL Paket / Express / Freight | Parcel / Express | DE | `dhl_paket`, `dhl_express`, `dhl_freight` |
| `kleine` | Kleine Spedition (24plus) | Freight | DE | `24plus`, `kleine_spedition` |
| `dpd` | DPD | Parcel | DE | `dpd_de`, `dpd_ch`, `dpd_at`, `geopost` |
| `ups` | UPS (United Parcel Service) | Parcel | US | `united_parcel_service` |
| `fedex` | FedEx | Express | US | `federal_express` |
| `gls` | GLS | Parcel | NL | `general_logistics_systems` |
| `swiss_post`| Swiss Post (Die Post) | Postal | CH | `post_ch`, `die_post`, `swisspost` |
| `post_at` | Österreichische Post | Postal | AT | `austrian_post`, `oesterreichische_post` |
| `deutsche_post`| Deutsche Post | Postal | DE | `dp`, `deutschepost` |
| `hermes` | Hermes / Evri | Parcel | DE | `myhermes`, `evri` |
| `dachser` | Dachser Intelligent Logistics | Freight | DE | `dachser_se` |
| `db_schenker`| DB Schenker | Freight | DE | `schenker` |
| `gebrueder_weiss`| Gebrüder Weiss | Freight | AT | `gw` |
| `planzer` | Planzer Transport | Freight | CH | `planzer_paket` |
| `tnt` | TNT Express | Express | NL | `tnt_express` |
| `manual` | Manual / Forwarder | Manual | — | `other`, `custom`, `forwarder` |

---

## Architecture & Design Principles

1. **Pure Vector Assets**: SVGs are inline strings rather than filesystem paths, making them work in Webpack, Vite, Node.js SSR, and serverless environments without requiring asset loaders.
2. **Deterministic Color Hashing**: When a logistics company has a one-off regional forwarder not in the registry, the library deterministically generates a pleasant, high-contrast palette based on the string name.
3. **Open Registry**: Custom carriers can be registered at runtime using `registerCarrier(definition)`.

---

## Contributing & Roadmap

We welcome contributions of additional carriers, regional forwarders, and updated tracking URL templates.

### Roadmap
- [ ] Dedicated React component package (`@mediabridge-solutions/carrier-icons-react`)
- [ ] Dedicated Vue 3 component package (`@mediabridge-solutions/carrier-icons-vue`)
- [ ] Standalone Web Component (`<carrier-badge>`)
- [ ] Additional carriers: Colissimo, Chronopost, PostNL, Correos, Royal Mail, Bpost, Bring, PostNord.

---

## License

[MIT](LICENSE) © [Mediabridge Solutions](https://github.com/mediabridge-solutions)

