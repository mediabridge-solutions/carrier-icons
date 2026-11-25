const test = require('node:test');
const assert = require('node:assert/strict');
const {
  getCarrier,
  hasCarrier,
  listCarriers,
  getTrackingUrl,
  renderCarrierBadgeElement,
  renderCarrierBadgesElement,
} = require('../dist/index.js');

test('lists registered carriers', () => {
  const carriers = listCarriers();
  assert.ok(carriers.length >= 15, `Expected at least 15 carriers, got ${carriers.length}`);
  const codes = carriers.map(c => c.code);
  assert.ok(codes.includes('dhl'));
  assert.ok(codes.includes('kleine'));
  assert.ok(codes.includes('dpd'));
  assert.ok(codes.includes('ups'));
  assert.ok(codes.includes('fedex'));
  assert.ok(codes.includes('swiss_post'));
  assert.ok(codes.includes('post_at'));
});

test('resolves carrier by direct code and alias', () => {
  assert.equal(hasCarrier('dhl'), true);
  assert.equal(hasCarrier('dhl_express'), true);
  assert.equal(hasCarrier('24plus'), true);

  const dhl = getCarrier('dhl');
  assert.equal(dhl.code, 'dhl');
  assert.equal(dhl.label, 'DHL');
  assert.equal(dhl.colors.bg, '#ffcc00');
  assert.equal(dhl.colors.fg, '#d40511');

  const twentyFour = getCarrier('24plus');
  assert.equal(twentyFour.code, '24plus');
  assert.equal(twentyFour.label, '24plus');
  assert.ok(twentyFour.inlineSvg.includes('<svg'));
  assert.ok(twentyFour.svg.includes('<svg'));
});

test('generates robust fallback for unknown carrier', () => {
  assert.equal(hasCarrier('schneider_forwarding'), false);
  const custom = getCarrier('schneider_forwarding');
  assert.equal(custom.code, 'schneider_forwarding');
  assert.equal(custom.category, 'manual');
  assert.ok(custom.colors.bg.startsWith('#'));
  assert.equal(custom.colors.fg, '#ffffff');
  assert.ok(custom.svg.includes('<svg'));
});

test('generates tracking URLs with placeholders', () => {
  const dhl = getCarrier('dhl');
  const url = getTrackingUrl(dhl, '0034043423423');
  assert.ok(url.includes('0034043423423'));

  const unknown = getCarrier('some_unknown');
  assert.equal(getTrackingUrl(unknown, '123'), null);
});

test('resolves compact codes, display names and full company names', () => {
  assert.equal(getCarrier('postch').code, 'swiss_post');
  assert.equal(getCarrier('POST_CH').code, 'swiss_post');
  assert.equal(getCarrier('Swiss Post').code, 'swiss_post');
  assert.equal(getCarrier('Die Schweizerische Post').code, 'swiss_post');
  assert.equal(getCarrier('postat').code, 'post_at');
  assert.equal(getCarrier('Österreichische Post').code, 'post_at');
  assert.equal(getCarrier('DHL Paket').code, 'dhl');
  assert.equal(getCarrier('SpediFux').code, 'planzer');
  assert.equal(getCarrier('planzer_classic').code, 'planzer');
  assert.equal(hasCarrier('Swiss Post'), true);
  assert.equal(hasCarrier('postch'), true);
  assert.equal(hasCarrier('Some Courier'), false);
  assert.equal(getCarrier('Some Courier').label, 'Some Courier');
});

test('detects the carrier from the tracking number format', () => {
  const { detectCarrierByTrackingNumber } = require('../dist/index.js');
  assert.equal(detectCarrierByTrackingNumber('1ZYG88576820003017').code, 'ups');
  assert.equal(detectCarrierByTrackingNumber('1zyg 8857 6820 0030 17').code, 'ups');
  assert.equal(detectCarrierByTrackingNumber('996000098400059724').code, 'swiss_post');
  assert.equal(detectCarrierByTrackingNumber('99.60.000984.00059724').code, 'swiss_post');
  assert.equal(detectCarrierByTrackingNumber('RR123456785CH').code, 'swiss_post');
  assert.equal(detectCarrierByTrackingNumber('98.04.123456.12345678').code, 'swiss_post');
  assert.equal(detectCarrierByTrackingNumber('980412345612345678').code, 'swiss_post');
  assert.equal(detectCarrierByTrackingNumber('0350123456789'), null);
  assert.equal(detectCarrierByTrackingNumber('00340433930757206954').code, 'dhl');
  assert.equal(detectCarrierByTrackingNumber('CI423901499DE'), null);
  assert.equal(detectCarrierByTrackingNumber('911218577612101552'), null);
  assert.equal(detectCarrierByTrackingNumber(''), null);
  assert.equal(detectCarrierByTrackingNumber(null), null);
});

test('carries platform-specific names where they differ from the standard name', () => {
  assert.equal(getCarrier('dhl').platformNames.shopify, 'DHL');
  assert.equal(getCarrier('swiss_post').platformNames, undefined);
  assert.equal(getCarrier('swiss_post').name, 'Swiss Post');
  assert.equal(getCarrier('ups').name, 'UPS');
});
