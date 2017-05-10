const hapi = require('hapi');
const vision = require('vision');
const cookieAuthModule = require('hapi-auth-cookie');
const contextCredentials = require('hapi-context-credentials');
const handlebars = require('./handlebars');
const routes = require('./routes');
const inert = require('inert');
const fs = require('fs');

require('env2')('config.env');

const server = new hapi.Server();

const port = process.env.PORT || 4000;

server.connection({
  port,
  tls: process.env.NODE_ENV !== 'production' && {
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/cert.pem'),
  },
  // state: {
  //   isSameSite: 'Lax',
  // },
});

server.register([vision, inert, cookieAuthModule, contextCredentials], (err) => {
  /* istanbul ignore next */
  if (err) throw err;

  server.auth.strategy('base', 'cookie', 'required', {
    password: process.env.COOKIE_PASSWORD,
    cookie: 'FACAPPS',
    isSecure: true,
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/',
    redirectOnTry: false,
    isSameSite: false,
  });

  server.views(handlebars);
  server.route(routes);
});

module.exports = server;
