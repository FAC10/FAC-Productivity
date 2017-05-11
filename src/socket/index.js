const { tickById, reset } = require('../database/post');
const { allPop, getCurrent } = require('../database/get');
const getRandomName = require('./getRandomName');
const exec = require('child_process').exec;


module.exports = (listener) => {
  const io = require('socket.io').listen(listener);

  let child = null;
  let type = null;
  const startText = () => {
    const textExample = '../rpi-rgb-led-matrix/examples-api-use/text-example';
    const fonts = '../rpi-rgb-led-matrix/fonts/';
    const font = {
      '10x20': '10x20.bdf',
      '4x6': '4x6.bdf',
      '5x7': '5x7.bdf',
      '5x8': '5x8.bdf',
      '6x10': '6x10.bdf',
      '6x12': '6x12.bdf',
      '6x13': '6x13.bdf',
      '6x13B': '6x13B.bdf',
      '6x13O': '6x13O.bdf',
      '6x9': '6x9.bdf',
      '7x13': '7x13.bdf',
      '7x13B': '7x13B.bdf',
      '7x13O': '7x13O.bdf',
      '7x14': '7x14.bdf',
      '7x14B': '7x14B.bdf',
      '8x13': '8x13.bdf',
      '8x13B': '8x13B.bdf',
      '8x13O': '8x13O.bdf',
      '9x15': '9x15.bdf',
      '9x15B': '9x15B.bdf',
      '9x18': '9x18.bdf',
      '9x18B': '9x18B.bdf',
      clR6x12: 'clR6x12.bdf',
      helvR12: 'helvR12.bdf',
      tom: 'tom-thumb.bdf',
    };
    const xPos = '5';
    const yPos = '14';
    const rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];

    child = exec(`${textExample} -f ${fonts}${font['7x13B']} -y${yPos} -x${xPos} -C${rgb[0]},${rgb[1]},${rgb[2]} --led-rows=32 --led-chain=2`);
    child.stdin.setEncoding('utf-8');
    child.stdout.pipe(process.stdout);
    type = 'text';
  };

  const displayText = (text) => {
    if (type === 'text') {
      child.stdin.write(`${text}\n`);
      console.log('DISPLAYED TEXT');
    } else if (type !== 'starting') {
      console.log(type);
      type = 'starting';
      console.log('RESETTING TEXT DISPLAY');
      startText();
      displayText(text);
    }
  };

  const killProcess = () => {
    child.kill();
    console.log('KILLED THE PROCESS');
  };

  startText();


  let clock = null;
  const runClock = (stop) => {
    if (stop) {
      clock ? clearInterval(clock) : '';
      setTimeout(() => {
        killProcess();
      }, 1000);
      setTimeout(() => {
        runClock();
      }, 1500);
    } else {
      const hour = 1000 * 60 * 60;
      console.log('TRYING TO RUN THE CLOCK DISPLAY');
      displayText(`  ${new Date(Date.now() + hour).toISOString().slice(-13, -8)}`);
      clock = setInterval(() => {
        displayText(`  ${new Date(Date.now() + hour).toISOString().slice(-13, -8)}`);
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
      console.log(type);
      displayText(data.n);
      if (type === 'text') {
        runClock(true);
      }
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
