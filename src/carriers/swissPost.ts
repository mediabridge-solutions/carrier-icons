import { CarrierDefinition } from '../types';

export const swissPost: CarrierDefinition = {
  code: 'swiss_post',
  name: 'Swiss Post',
  label: 'Die Post',
  category: 'postal',
  country: 'CH',
  aliases: ['post_ch', 'die_post', 'swisspost', 'la_poste_ch'],
  colors: {
    bg: '#ffcc00',
    fg: '#d50000',
    border: '#e6b800',
  },
  tracking: {
    urlTemplate: 'https://service.post.ch/ekp-web/kpm/itemSearchList.do?consignmentId={trackingNumber}',
  },
  svg: "<svg version=\"1.1\" id=\"Ebene_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 56 56\" style=\"enable-background:new 0 0 56 56;\" xml:space=\"preserve\"> <style type=\"text/css\"> .st0{fill:#FFCC00;} .st1{fill:#FF0000;} </style> <g id=\"Logo\"> <rect x=\"0.000367\" y=\"-0.000285\" class=\"st0\" width=\"55.999996\" height=\"56.000004\"/> <polygon class=\"st1\" points=\"26.444813,25.121939 26.444813,14.777493 15.32259,14.777493 15.32259,22.633049 7.778145,22.633049 7.778145,33.366386 15.32259,33.366386 15.32259,41.221939 26.444813,41.221939 26.444813,30.877495 23.800367,30.877495 23.800367,38.733047 17.967033,38.733047 17.967033,30.877495 10.422589,30.877495 10.422589,25.121939 17.967033,25.121939 17.967033,17.266382 23.800367,17.266382 23.800367,25.121939 \"/> <path d=\"M41.659962,24.192696c0,1.876564-1.548973,3.340361-3.513401,3.340361h-2.990635v-6.455555h2.990639 C40.186604,21.077494,41.659962,22.391075,41.659962,24.192696z M39.431103,14.777493H28.000366v26.444447h7.15556v-7.855553 h4.275181c5.251015,0,9.331078-4.006624,9.331078-9.182213C48.76218,18.970772,44.606693,14.777493,39.431103,14.777493z\"/> </g> </svg>",
  inlineSvg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 24\" width=\"100\" height=\"24\"><rect width=\"100\" height=\"24\" rx=\"3\" fill=\"#ffffff\" stroke=\"#e5e7eb\" stroke-width=\"1\"/><svg x=\"10\" y=\"2\" width=\"80\" height=\"20\" viewBox=\"0 0 56 56\" preserveAspectRatio=\"xMidYMid meet\"><g id=\"Logo\"><rect x=\"0\" y=\"0\" fill=\"#FFCC00\" rx=\"3\" width=\"56\" height=\"56\"/><polygon fill=\"#FF0000\" points=\"26.44,25.12 26.44,14.78 15.32,14.78 15.32,22.63 7.78,22.63 7.78,33.37 15.32,33.37 15.32,41.22 26.44,41.22 26.44,30.88 23.8,30.88 23.8,38.73 17.97,38.73 17.97,30.88 10.42,30.88 10.42,25.12 17.97,25.12 17.97,17.27 23.8,17.27 23.8,25.12 \"/><path fill=\"#000000\" d=\"M41.66,24.19c0,1.88-1.55,3.34-3.51,3.34h-2.99v-6.46h2.99C40.19,21.08,41.66,22.39,41.66,24.19z M39.43,14.78H28v26.44h7.16v-7.86h4.28c5.25,0,9.33-4.01,9.33-9.18C48.76,18.97,44.61,14.78,39.43,14.78z\"/></g></svg></svg>",
};
