# @mediabridge-solutions/carrier-icons

Platform-agnostic, lightweight vector icons, official brand palettes, tracking URLs, and metadata for shipping carriers, parcel networks, and freight logistics forwarders.

Designed for e-commerce shops, warehouse management systems (WMS), transport management systems (TMS), ERPs, and delivery tracking dashboards by [Mediabridge Solutions](https://mediabridge.solutions).

🌐 **Interactive Icon Preview & Registry Table**: [https://mediabridge-solutions.github.io/carrier-icons/](https://mediabridge-solutions.github.io/carrier-icons/)

---

## Why This Library?

It is easy to find original carrier logos on the web, but when you integrate them into actual user interfaces—such as data tables, admin grids, shipment lists, and compact status cards—it is notoriously difficult to make them look cohesive and consistent:

- **Mismatched Dimensions & Aspect Ratios**: Some carrier logos are ultra-wide wordmarks, while others are tall vertical crests or multi-line layouts with unreadable taglines.
- **Background Clashes**: Logos with transparent backgrounds, dark lettering, or faint outlines disappear against dark or colored table rows.
- **Standardized Inline Badges**: The core goal of this library is to collect and standardize icons across as many freight carriers and parcel couriers (KEP / CEP) as possible, providing ready-to-use, uniform **100×24 inline logotypes** (`inlineSvg`) engineered specifically to look crisp, beautiful, and consistent in compact UI components.
- **Brand Palette Fallbacks & Micro-Badges**: Every carrier definition includes authentic brand colors (`bg`, `fg`, `border`). This unlocks an essential use case: rendering ultra-simple, ultra-fast, lightweight CSS pill badges or tag chips when an SVG logo is too detailed or when maintaining strict visual minimalism across large data grids.

---

## Features

- **Platform & Framework Agnostic**: Zero runtime dependencies. Runs in Node.js, modern browsers, vanilla JavaScript, Vue, React, Svelte, Angular, and SSR.
- **Logistics & Freight Coverage**: Covers global parcel couriers (DHL, UPS, FedEx, DPD, GLS) as well as European regional postal services and freight/pallet networks (Kleine/24plus, Dachser, DB Schenker, Gebrüder Weiss, Planzer, Swiss Post, Österreichische Post).
- **Brand Colors & SVGs**: Includes official brand background/foreground colors, authentic vector SVGs (`svg`), and standardized 100x24 inline badge SVGs (`inlineSvg`) ideal for data grids and compact tables.
- **Dynamic Fallbacks**: Unknown or unmapped carrier codes automatically generate deterministic contrast badges and fallback SVGs, guaranteeing that user interfaces never crash or display broken layouts.
- **Tracking URL Resolver**: Built-in tracking URL templates with parameter replacement (`{trackingNumber}`, `{postalCode}`).
- **Native DOM Renderers**: Includes agnostic `renderCarrierBadgeElement()` helpers for direct use in high-performance data tables (such as ag-Grid, Datatables, or virtual lists). Supports both `'inline'` and `'real'` logo styles.
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
console.log(hasCarrier('24plus')); // true

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
  svg: '<svg ...>...</svg>', // Full official vector logo
  inlineSvg: '<svg ...>...</svg>', // Standardized 100x24 badge SVG
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
  svg: '<svg ... fallback initials badge ... </svg>',
  inlineSvg: '<svg ... fallback initials badge ... </svg>'
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

// Single badge element with standardized inline logo (default)
const badgeEl = renderCarrierBadgeElement('dhl', { showIcon: true, logoType: 'inline' });
document.getElementById('carrier-cell').appendChild(badgeEl);

// ag-Grid Cell Renderer example
const columnDefs = [
  {
    field: 'carrier',
    headerName: 'Carrier',
    cellRenderer: (params) => renderCarrierBadgeElement(params.value, { showIcon: true }),
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
    <!-- Use authentic SVG or standardized inlineSvg -->
    <span v-if="showIcon" class="carrier-icon" v-html="carrier.inlineSvg || carrier.svg" />
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
| `kleine` | Kleine Spedition | Freight | DE | `kleine_spedition`, `spedition_kleine` |
| `24plus` | 24plus Systemverkehre | Freight | DE | `twentyfourplus`, `24_plus`, `24plus_logistics` |
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

[MIT](LICENSE) © [Mediabridge Solutions](https://mediabridge.solutions)

