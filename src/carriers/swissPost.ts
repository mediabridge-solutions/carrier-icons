import { CarrierDefinition } from '../types';

export const swissPost: CarrierDefinition = {
  code: 'swiss_post',
  name: 'Swiss Post (Die Post)',
  label: 'Swiss Post',
  category: 'postal',
  country: 'CH',
  aliases: ['post_ch', 'die_post', 'la_poste_suisse', 'swisspost'],
  colors: {
    bg: '#ffcc00',
    fg: '#d40511',
    border: '#e6b800',
  },
  tracking: {
    urlTemplate: 'https://service.post.ch/ekp-web/kpm/search/detailSearch/{trackingNumber}',
  },
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#FFCC00" rx="3"/><rect x="12" y="5" width="14" height="14" rx="2" fill="#D40511"/><path d="M19 8v8M15 12h8" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><text x="60" y="16" fill="#111111" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="800" font-size="11" text-anchor="middle">Die Post</text></svg>`,
};
