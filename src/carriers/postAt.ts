import { CarrierDefinition } from '../types';

export const postAt: CarrierDefinition = {
  code: 'post_at',
  name: 'Österreichische Post',
  label: 'Post AT',
  category: 'postal',
  country: 'AT',
  aliases: ['oesterreichische_post', 'austrian_post'],
  colors: {
    bg: '#ffcc00',
    fg: '#111111',
    border: '#d4a800',
  },
  tracking: {
    urlTemplate: 'https://www.post.at/sv/sendungssuche?snr={trackingNumber}',
  },
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#FFCC00" rx="3"/><text x="50" y="16" fill="#111111" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="900" font-size="12" text-anchor="middle" letter-spacing="1">POST.AT</text></svg>`,
};
