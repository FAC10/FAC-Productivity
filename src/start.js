const server = require('./server');
const socket = require('./socket');


server.start((err) => {
  if (err) throw err;


  socket(server.listener);

  console.log(`Server running at: ${server.info.uri}`);
});
