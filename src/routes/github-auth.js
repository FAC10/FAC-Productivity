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
        return reply.view('error', { error: 'Error connecting to Github API.' });
      }

      const { access_token } = qs.parse(githubAccessTokenResponse);
      if (!access_token) {
        return reply.view('error', { error: 'We didn\'t get an access token from Github, sorry!' });
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
          return reply.view('error', { error: 'No user response from Github.' });
        }

        const userInfo = JSON.parse(githubUserResponse);

        const requestOrgOptions = {
          url: 'https://api.github.com/user/orgs',
          headers: requestHeaders,
        };

        request.get(requestOrgOptions, (err, response, orgResponse) => {
          if (err) {
            return reply.view('error', { error: 'Error getting organisations from Github.' });
          }

          const orgs = JSON.parse(orgResponse);
          const githubOrgId = 9970257;

          const isFacMember = Boolean(orgs.find(org => org.id === githubOrgId));

          if (isFacMember) {
            console.log(isFacMember, 'YOU TRUE?');
            req.cookieAuth.set({
              name: userInfo.name,
              avatar: userInfo.avatar_url,
            });
            return reply.redirect('/landing');
          }

          return reply.view('error', { error: 'You\'re not allowed here.' });
        });
      });
    });
  },
};
