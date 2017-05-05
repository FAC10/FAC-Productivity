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


    request.put(options, (err, response, body) => {
      if (err || response.headers.status !== '204 No Content') {
        return reply({ success: false }).code(404);
      }

      const starsOptions = {
        headers,
        url: 'https://api.github.com/repos/yvonne-liu/FAC-Hardware',
      };


      request.get(starsOptions, (err, response, body) => {
        const starCount = JSON.parse(body).stargazers_count;

        req.cookieAuth.set({
          name: req.auth.credentials.name,
          avatar: req.auth.credentials.avatar,
          access_token: accessToken,
          isStarred: true,
          starCount,
        });

        reply({ starCount });
      });
    });
  },
};
