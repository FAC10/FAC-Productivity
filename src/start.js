const server = require('./server');
const socket = require('./socket');
const exec = require('child_process').exec;


server.start((err) => {
  if (err) throw err;

  const exec = require('child_process').exec;

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

  const child = exec(`${textExample} -f ${fonts}${font['7x13B']} -y${yPos} -x${xPos} -C${rgb[0]},${rgb[1]},${rgb[2]} --led-rows=32 --led-chain=2`);

  child.stdin.setEncoding('utf-8');
  child.stdout.pipe(process.stdout);

  socket(server.listener, child);

  console.log(`Server running at: ${server.info.uri}`);
});
