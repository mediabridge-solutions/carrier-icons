import { CarrierDefinition } from '../types';

export const dbSchenker: CarrierDefinition = {
  code: 'db_schenker',
  name: 'DB Schenker',
  label: 'Schenker',
  category: 'freight',
  country: 'DE',
  aliases: ['schenker', 'deutsche_bahn_schenker'],
  colors: {
    bg: '#003366',
    fg: '#ffffff',
    border: '#002244',
  },
  tracking: {
    urlTemplate: 'https://www.dbschenker.com/global/tracking?ref={trackingNumber}',
  },
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#003366" rx="3"/><text x="50" y="16" fill="#FFFFFF" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="800" font-size="11" text-anchor="middle" letter-spacing="1">SCHENKER</text></svg>`,
};
