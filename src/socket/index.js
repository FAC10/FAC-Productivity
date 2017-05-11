const { tickById, reset } = require('../database/post');
const { allPop, getCurrent } = require('../database/get');
const getRandomName = require('./getRandomName');
const textDisplay = require('./../led-display/text-display');

module.exports = (listener) => {
  const io = require('socket.io').listen(listener);

  let currentProcess = { child: null, type: null }; // eslint-disable-line

  const runText = (current, text) => {
    if (current.type === 'text') {
      return current.child.stdin.write(`${text}\n`);
    } else if (current.type) {
      current.child.end();
    }
    textDisplay((child) => {
      currentProcess = { child, type: 'text' };
      child.stdin.write(`${text}\n`);
    });
  };

  let clock = null;
  const runClock = (child, stop) => {
    if (stop) {
      clock ? clearInterval(clock) : '';
      setTimeout(() => {
        runClock();
      }, 5000);
    } else {
      runText(`  ${new Date(Date.now()).toISOString().slice(-13, -8)}\n`);
      clock = setInterval(() => {
        runText(`  ${new Date(Date.now()).toISOString().slice(-13, -8)}\n`);
      }, 30000);
    }
  };


  io.on('connection', (socket) => {
    const render = (err, name) => err ? console.log(err) : io.emit('allName', { n: name.name || name, id: name.id || null });
    const callAllPop = () => allPop((err, res) => err ? console.log(err) :
      res.allUsers ? io.emit('allPop', { on: true }) : io.emit('allPop', { on: false }));

    getCurrent((err, { currentName }) => socket.emit('name', { n: currentName }));
    callAllPop();

    // React client stuff
    socket.on('name', (data) => {
      runText(`${data.n}\n`);
      runClock(true);
      io.emit('name', data);
      if (data.id) {
        tickById(data.id, (err) => {
          if (err) socket.emit('error', { error: 'Error ticking name in database' });
        });
      }
    });

    socket.on('displayWord', ({ string }) => {
      runText(`${string}\n`);
    });

    socket.on('update', () => io.emit('update'));

    socket.on('allPop', () => callAllPop());

    socket.on('reset', () => {
      io.emit('reset');
      reset(() => {});
    });

    socket.on('requestName', (msg) => {
      allPop((err, res) => {
        err ? console.log(err) :
          res ? getRandomName(render) : '';
      });
    });
  });
};
