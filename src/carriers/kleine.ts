import { CarrierDefinition } from '../types';

export const kleine: CarrierDefinition = {
  code: 'kleine',
  name: 'Kleine Spedition (24plus)',
  label: 'Kleine',
  category: 'freight',
  country: 'DE',
  aliases: ['24plus', 'kleine_spedition', 'spedition_kleine'],
  colors: {
    bg: '#0a3d62',
    fg: '#ffffff',
    border: '#072a44',
  },
  tracking: {
    description: 'Kleine Spedition LTL/FTL pallet network tracking via 24plus hub.',
  },
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#0A3D62" rx="3"/><text x="50" y="16" fill="#FFFFFF" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="800" font-size="11" text-anchor="middle" letter-spacing="1">KLEINE 24+</text></svg>`,
};
