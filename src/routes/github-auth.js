const qs = require('querystring');
const request = require('request');

module.exports = {
  method: 'GET',
  path: '/login',
  config: {
    auth: false,
  },
  handler: (req, reply) => {
    const queryParamAccessToken = {
      code: req.url.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    };

    const accessTokenUrl = `https://github.com/login/oauth/access_token?${qs.stringify(queryParamAccessToken)}`;

    request.post(accessTokenUrl, (err, response, githubAccessTokenResponse) => {
      if (err) {
        console.log(err);
      }

      const { access_token } = qs.parse(githubAccessTokenResponse);
      if (!access_token) {
        console.log('No access token!');
        return reply('No access token!');
      }

      const userUrl = 'https://api.github.com/user';
      const requestHeaders = {
        'User-Agent': 'fac-apps',
        Authorization: `token ${access_token}`,
      };
      const requestUserOptions = {
        url: userUrl,
        headers: requestHeaders,
      };

      request.get(requestUserOptions, (err, response, githubUserResponse) => {
        if (err) {
          console.log(err);
        }

        const userInfo = JSON.parse(githubUserResponse);

        const requestOrgOptions = {
          url: 'https://api.github.com/user/orgs',
          headers: requestHeaders,
        };

        request.get(requestOrgOptions, (err, response, orgResponse) => {
          if (err) {
            console.log(err);
          }

          const orgs = JSON.parse(orgResponse);
          const githubOrgId = 9970257;

          const isFacMember = Boolean(orgs.find(org => org.id === githubOrgId));

          if (isFacMember) {
            req.cookieAuth.set({
              name: userInfo.name,
              avatar: userInfo.avatar_url,
            });
            reply.redirect('/landing');
          } else {
            reply('Sorry, you don\'t have permission to view this page');
          }
        });
      });
    });
  },
};
