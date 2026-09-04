import { CarrierDefinition } from '../types';

export const dpd: CarrierDefinition = {
  code: 'dpd',
  name: 'DPD',
  label: 'DPD',
  category: 'parcel',
  country: 'DE',
  aliases: ['dpd_de', 'dpd_ch', 'dpd_at', 'dpd_group', 'geopost'],
  colors: {
    bg: '#dc0032',
    fg: '#ffffff',
    border: '#b00028',
  },
  tracking: {
    urlTemplate: 'https://tracking.dpd.de/status/de_DE/parcel/{trackingNumber}',
  },
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#DC0032" rx="3"/><path fill="#FFFFFF" d="M14 6h6.5c3.5 0 5.8 2.3 5.8 6s-2.3 6-5.8 6H14V6zm3.6 9.4h2.5c1.8 0 3-1.1 3-3.4s-1.2-3.4-3-3.4h-2.5v6.8zm11.4-9.4h6.5c3.5 0 5.8 2.3 5.8 6s-2.3 6-5.8 6H29V6zm3.6 9.4h2.5c1.8 0 3-1.1 3-3.4s-1.2-3.4-3-3.4h-2.5v6.8zm11.4-9.4h6.5c3.5 0 5.8 2.3 5.8 6s-2.3 6-5.8 6H44V6zm3.6 9.4h2.5c1.8 0 3-1.1 3-3.4s-1.2-3.4-3-3.4h-2.5v6.8z"/></svg>`,
};
