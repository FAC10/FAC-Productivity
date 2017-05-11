const exec = require('child_process').exec;

const options = require('./text-display-options');

module.exports = (callback) => {
  const textProcess = exec(options);
  textProcess.stdin.setEncoding('utf-8');
  textProcess.stdout.pipe(process.stdout);
  callback(null, textProcess);
};
