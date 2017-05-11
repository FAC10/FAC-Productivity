// const exec = require('child_process').exec;
//
//
// const pilib = exec('../rpi-rgb-led-matrix/examples-api-use/text-example -f ../rpi-rgb-led-matrix/fonts/8x13B.bdf -y14 -C255,0,0 --led-rows=32 --led-chain=2');
//
// pilib.stdin
//
// pilib.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });
//
// pilib.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });
//
// pilib.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });


const exec = require('child_process').exec;


const textExample = '../rpi-rgb-led-matrix/examples-api-use/text-example';
const fonts = '../rpi-rgb-led-matrix/fonts/';
const font = '8x13B.bdf';
const yPos = '14';
const rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];


const child = exec(`${textExample} -f ${fonts}${font} -y${yPos} -C${rgb[0]},${rgb[1]},${rgb[2]} --led-rows=32 --led-chain=2`);

child.stdin.setEncoding('utf-8');
child.stdout.pipe(process.stdout);

child.stdin.write('Finn\n');

setTimeout(() => {
  child.stdin.write('Yvonne\n');
}, 1000);

setTimeout(() => {
  child.stdin.write('Antonio\n');
}, 2000);

setTimeout(() => {
  child.stdin.write('Lucy\n');
}, 3000);

setTimeout(() => {
  child.stdin.end();
}, 4000);
