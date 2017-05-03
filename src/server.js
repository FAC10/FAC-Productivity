const hapi = require('hapi');
const server = new hapi.Server();
require('env2')('config.env');

const vision = require('vision');
const cookieAuthModule = require('hapi-auth-cookie');
const contextCredentials = require('hapi-context-credentials');
const handlebars = require('./handlebars');

const routes = require('./routes');

server.connection({
  port: process.env.PORT || 4000,
});

server.register([vision, cookieAuthModule, contextCredentials], err => {
  if (err) throw err;

  server.auth.strategy('base', 'cookie', 'required', {
    password: process.env.COOKIE_PASSWORD,
    cookie: 'FACAPPS',
    isSecure: process.env.NODE_ENV !== 'dev',
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/',
    redirectOnTry: false,
    isSameSite: false,
  });

  server.views(handlebars);
  server.route(routes);
});

module.exports = server;
