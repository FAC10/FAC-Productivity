const test = require('tape');
const server = require('../src/server');

const routes = [
  { url: '/', method: 'GET', statusCode: 200, payload: 'DOCTYPE html' },
  { url: '/some-bad-url', method: 'GET', statusCode: 404 },
  { url: '/home', method: 'GET', statusCode: 302 }, // not logged in
  { url: '/css/style.css', method: 'GET', statusCode: 200 },
  { url: '/csssss', method: 'GET', statusCode: 404 },
  { url: '/home', method: 'GET', credentials: 'user', statusCode: 200 },
  { url: '/twenty', method: 'GET', statusCode: 302 },
  { url: '/twenty', method: 'GET', credentials: 'user', statusCode: 200 },
  { url: '/pomodoro', method: 'GET', statusCode: 302 },
  { url: '/pomodoro', method: 'GET', credentials: 'user', statusCode: 200 },
];

routes.forEach(({ url, method, statusCode, payload, credentials }) => {
  test(`${url} ${method} route`, (t) => {
    const options = {
      url,
      method,
    };
    if (credentials) { options.credentials = credentials; }
    server.inject(options, (res) => {
      statusCode && t.equal(res.statusCode, statusCode, `statusCode should be ${statusCode}`);
      payload && t.ok(res.payload.indexOf(payload) !== -1, 'correct payload should be served');
      t.end();
    });
  });
});
