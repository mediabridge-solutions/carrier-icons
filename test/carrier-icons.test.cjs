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
