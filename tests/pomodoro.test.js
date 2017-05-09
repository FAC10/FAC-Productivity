const test = require('tape');
const pomo = require('../public/js/pomodoro');
const runTest = (isWork) => {
  test('onSwitchFunc correctly called when switching from work to break', (t) => {
    t.ok(`${isWork ? 'Switched to work' : 'Switched to break'}`);
    t.end();
  });
};
const p = pomo(10, 15, runTest);

test('Pomodoro.js getStart and setStart', (t) => {
  t.equal(p.getStart(), null, 'getStart should initial with null');
  p.setStart(123);
  t.equal(p.getStart(), 123, 'setStart(123) should change the getStart value to 123');
  t.end();
});

test('Pomodoro.js difference should return the difference between two values', (t) => {
  const expected = 5;
  t.equal(p.difference(5, 10), expected, 'The difference is 5...');
  t.end();
});

test('Pomodoro.js toReadableTime should return current time in a readable format', (t) => {
  const expected = '00:01';
  t.equal(p.toReadableTime(1000), expected, '1000ms should return 00:01');
  const expectedHour = '00:00';
  t.equal(p.toReadableTime(60 * 60 * 1000), expectedHour, '1 hour should return 00:00');
  const expectedMin = '35:00';
  t.equal(p.toReadableTime(35 * 60 * 1000), expectedMin, '35 minutes should return 35:00');
  t.end();
});

test('Pomodoro.js checkIfSwitch checks if time is greater than len', (t) => {
  const expected = true;
  t.equal(p.checkIfSwitch(100, 10), expected, 'checkIfSwitch should return true');
  const expectedFalse = false;
  t.equal(p.checkIfSwitch(10, 100), expectedFalse, 'checkIfSwitch should return false');
  t.end();
});

test('Pomodoro.js fractionComplete checks how close the first argument is to the second', (t) => {
  const expected = 3;
  t.equal(p.fractionComplete(21, 7), expected, 'fractionComplete should return 3');
  t.end();
});

test('Pomodoro.js getPause ', (t) => {
  t.equal(p.getPause(), null, 'getPause should initial with null');
  p.setStart(125);
  p.setPause(150);
  const expected = 25;
  t.equal(p.getPause(), expected, 'getPause should return 25 when setStart is 125 and setPause is 150');
  t.end();
});

test('Pomodoro.js update function', (t) => {
  p.setStart(1);
  let expected = 8;
  t.deepEqual(p.update(9).time, expected, 'The update time should be 8 with start time 1 and update time 9');
  p.setStart(1);
  expected = 0.8;
  t.deepEqual(p.update(9).amountComplete, expected, 'amountCompleted is the correct fraction of time');

  p.update();
  p.setStart(0);
  t.deepEqual(p.update(0).time, 0, 'Should return 0 when there is no value in update');
  let start = 2;
  start += 10;
  t.deepEqual(p.update(start).time, 0, 'Should return 0 on the first update with a switch');

  start += 1;
  t.deepEqual(p.update(start).time, 1, 'First update after a call should return the difference the argument and the switch');

  start += 15;
  t.deepEqual(p.update(start).time, 0, 'Should return 0 on the first update after the second switch');

  start += 1;
  t.deepEqual(p.update(start).time, 1, 'First update after second switch should return the difference between the argument and the switch');
  t.end();
});
