const request = require('request');

module.exports = {
  method: 'GET',
  path: '/star',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {
    const accessToken = req.auth.credentials.access_token;

    const headers = {
      'User-Agent': 'fac-apps',
      Authorization: `token ${accessToken}`,
      'Content-Length': 0,
    };

    const options = {
      headers,
      url: 'https://api.github.com/user/starred/yvonne-liu/FAC-Hardware',
    };


    const starRepo = request.put(options, (err, response, body) => {
      if (err) {
        reply().code(404);
      }
      reply.view('home');
    });
  },
};
