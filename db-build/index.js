const fs = require('fs');
const path = require('path');
const connect = require('./../src/database/connect');

const build = fs.readFileSync(path.join(__dirname, 'build.sql'), 'utf8');

connect.query(build, (err, res) => {
  if (err) throw err;
  console.log('db build successful');
  connect.end();
});
