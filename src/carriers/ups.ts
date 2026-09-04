import { CarrierDefinition } from '../types';

export const ups: CarrierDefinition = {
  code: 'ups',
  name: 'UPS',
  label: 'UPS',
  category: 'parcel',
  country: 'US',
  aliases: ['united_parcel_service'],
  colors: {
    bg: '#351c15',
    fg: '#ffb500',
    border: '#22110c',
  },
  tracking: {
    urlTemplate: 'https://www.ups.com/track?tracknum={trackingNumber}',
  },
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#351C15" rx="3"/><text x="50" y="17" fill="#FFB500" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="900" font-size="14" text-anchor="middle" letter-spacing="2">UPS</text></svg>`,
};
