const  exec  = require('child_process').exec;

//const pilib = spawn('sh', [ 'deploy.sh' ], {
//  cwd: process.env.HOME + '/myProject',
//  env: Object.assign({}, process.env, { PATH: process.env.PATH + ':/usr/local/bin' })
//})


const pilib = exec('(while : ; do date +%T ; sleep 0.2 ; done) | ../rpi-rgb-led-matrix/examples-api-use/text-example -f ../rpi-rgb-led-matrix/fonts/8x13B.bdf -y8 -C255,0,0 --led-rows=32 --led-chain=2 -b 50');
//const pilib = spawn('ls', ['-lh', './']);
//const pilib = exec(['time-in-blue.sh']);

pilib.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

pilib.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

pilib.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
