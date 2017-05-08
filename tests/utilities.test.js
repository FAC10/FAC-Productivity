const test = require('tape');
const { partial, parallel } = require('../src/lib/utilities');

test('Do partials work', (t) => {
  const add = (a, b) => a + b;
  let add1 = partial(add, 1);
  t.equal(add1(2), 3, 'Should get 3');
  const add3 = (a, b, c) => a + b + c;
  add1 = partial(add3, 1);
  t.equal(add1(1, 1), 3, 'Should get 3');
  const add2 = partial(add3, 1, 1);
  t.equal(add2(1), 3, 'Should get 3');
  t.end();
});
