import { CarrierDefinition } from '../types';

export const gebruederWeiss: CarrierDefinition = {
  code: 'gebrueder_weiss',
  name: 'Gebrüder Weiss',
  label: 'GW',
  category: 'freight',
  country: 'AT',
  aliases: ['gw', 'gebr_weiss'],
  colors: {
    bg: '#ff6600',
    fg: '#ffffff',
    border: '#cc5200',
  },
  tracking: {
    urlTemplate: 'https://www.gw-world.com/e-services/tracking?search={trackingNumber}',
  },
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#FF6600" rx="3"/><text x="50" y="16" fill="#FFFFFF" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="900" font-size="11" text-anchor="middle" letter-spacing="0.5">GEBRÜDER WEISS</text></svg>`,
};
