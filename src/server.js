const hapi = require('hapi');
const vision = require('vision');
const handlebars = require('./handlebars');
const routes = require('./routes');
const inert = require('inert');

const server = new hapi.Server();

const port = process.env.PORT || 4000;

server.connection({
  port,
});

server.register([vision, inert], (err) => {
  /* istanbul ignore next */
  if (err) throw err;

  server.views(handlebars);
  server.route(routes);
});

module.exports = server;
