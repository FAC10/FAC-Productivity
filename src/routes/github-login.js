const qs = require('querystring');

module.exports = {
  method: 'GET',
  path: '/login-with-github',
  config: {
    auth: false,
  },
  handler: (req, reply) => {
    const queryParams = {
      client_id: process.env.CLIENT_ID,
      scope: 'user,repo',
    };

    const query = qs.stringify(queryParams);
    const url = 'https://github.com/login/oauth/authorize?';

    reply.redirect(url + query);
  },
};
