import { CarrierDefinition } from '../types';

export const tnt: CarrierDefinition = {
  code: 'tnt',
  name: 'TNT Express',
  label: 'TNT',
  category: 'express',
  country: 'NL',
  aliases: ['tnt_express'],
  colors: {
    bg: '#ff6600',
    fg: '#ffffff',
    border: '#cc5200',
  },
  tracking: {
    urlTemplate: 'https://www.tnt.com/express/en_gc/site/shipping-tools/tracking.html?searchType=con&cons={trackingNumber}',
  },
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#FF6600" rx="3"/><text x="50" y="17" fill="#FFFFFF" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="900" font-size="14" text-anchor="middle" letter-spacing="2">TNT</text></svg>`,
};
