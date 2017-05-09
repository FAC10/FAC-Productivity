const LedMatrix = require('node-rpi-rgb-led-matrix');

const matrix = new LedMatrix(32, 2);
console.log(matrix.getWidth(), matrix.getHeight());
console.log('running');
matrix.fill(255, 50, 100);
matrix.setPixel(16, 16, 100, 100, 100);

setInterval(() => {}, 1000);


// const Matrix = require('hzeller-matrix');
// const matrix = new Matrix({ width: 64, height: 32 });
//
// matrix.runText('HELLO EVERYONE');
