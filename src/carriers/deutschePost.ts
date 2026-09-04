import { CarrierDefinition } from '../types';

export const deutschePost: CarrierDefinition = {
  code: 'deutsche_post',
  name: 'Deutsche Post',
  label: 'Deutsche Post',
  category: 'postal',
  country: 'DE',
  aliases: ['dp', 'deutschepost'],
  colors: {
    bg: '#ffcc00',
    fg: '#111111',
    border: '#d4a800',
  },
  tracking: {
    urlTemplate: 'https://www.deutschepost.de/sendung/simpleQuery.html?locale=de_DE&piececode={trackingNumber}',
  },
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#FFCC00" rx="3"/><text x="50" y="16" fill="#111111" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="900" font-size="10" text-anchor="middle" letter-spacing="0.5">DEUTSCHE POST</text></svg>`,
};
