import { CarrierDefinition } from '../types';

export const dhl: CarrierDefinition = {
  code: 'dhl',
  name: 'DHL Paket',
  label: 'DHL',
  category: 'parcel',
  country: 'DE',
  aliases: ['dhl_paket', 'dhl_express', 'dhl_freight', 'deutsche_post_dhl'],
  colors: {
    bg: '#ffcc00',
    fg: '#d40511',
    border: '#e6b800',
  },
  tracking: {
    urlTemplate: 'https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode={trackingNumber}',
  },
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="#FFCC00" rx="3"/><path fill="#D40511" d="M12.5 7h10.2c4.1 0 6.3 1.8 5.7 4.7-.6 2.9-3.4 5.3-7.6 5.3H10.6l1.9-10zm7.8 7.3c2.3 0 3.8-1.2 4.1-2.6.3-1.4-.7-2.1-2.9-2.1h-4.3l-1 4.7h4.1zM32.5 7h4.8l-2 10h-4.8l2-10zm5.6 0h4.8l-1 4.8h6.2l1-4.8h4.8l-2 10h-4.8l.9-4.3h-6.2l-.9 4.3H36l2.1-10zm19.8 0h4.8l-1.6 7.6h7.5l-.5 2.4h-12.3l2.1-10z"/></svg>`,
};
