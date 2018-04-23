const ShortLink = require('../models/shortlink');

test('new link has hash', () => {
  const link = new ShortLink(null, 'helloworld.com');
  expect(link.getHash()).not.toBeNull();
  expect(link.getUrl()).toBe('helloworld.com');
})
