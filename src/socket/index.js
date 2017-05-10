const { tickById, reset } = require('../database/post');
const { allPop, getCurrent } = require('../database/get');
const getRandomName = require('./getRandomName');

module.exports = (listener, childProcess) => {
  const io = require('socket.io').listen(listener);

  let clock = null;
  const runClock = (stop) => {
    if (stop) {
      clock ? clearInterval(clock) : '';
      setTimeout(() => {
        runClock();
      }, 5000);
    } else {
      clock = setInterval(() => {
        childProcess.stdin.write(`${new Date(Date.now()).toISOString().slice(-13, -5)}\n`);
      }, 1000);
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
      childProcess.stdin.write(`${data.n}\n`);
      runClock(true);
      io.emit('name', data);
      if (data.id) {
        tickById(data.id, (err) => {
          if (err) socket.emit('error', { error: 'Error ticking name in database' });
        });
      }
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
