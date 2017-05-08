
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

test('Do parallel work', (t) => {
  t.plan(2);
  const fake = cb => cb(null, 1);
  const fakeError = cb => cb('error');
  parallel([fake, fake, fake], (error, result) => {
    t.deepEqual(result, [[1], [1], [1]], 'Should return an array of arrays');
  });
  parallel([fakeError], (error) => {
    t.deepEqual(error, 'error', 'error');
  });
});
