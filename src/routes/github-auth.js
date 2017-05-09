const qs = require('querystring');
const request = require('request');

const { parallel, partial } = require('./../lib/utilities');

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
    const accessTokenPath = 'https://github.com/login/oauth/access_token?';

    const accessTokenUrl = accessTokenPath + qs.stringify(queryParamAccessToken);

    request.post(accessTokenUrl, (err, response, githubAccessTokenResponse) => {
      if (err) {
        return reply.view('error', { error: 'Error connecting to Github API.' });
      }

      const { access_token } = qs.parse(githubAccessTokenResponse);
      if (!access_token) {
        return reply.view('error', { error: 'We didn\'t get an access token from Github, sorry!' });
      }

      const headers = {
        'User-Agent': 'fac-apps',
        Authorization: `token ${access_token}`,
      };

      const userUrl = 'https://api.github.com/user';
      const orgsUrl = 'https://api.github.com/user/orgs';
      const starsUrl = 'https://api.github.com/user/starred/yvonne-liu/FAC-Hardware';
      const starCountUrl = 'https://api.github.com/repos/yvonne-liu/FAC-Hardware/stargazers';

      const requestUser = partial(request.get, { url: userUrl, headers });
      const requestOrgs = partial(request.get, { url: orgsUrl, headers });
      const requestStars = partial(request.get, { url: starsUrl, headers });
      const requestStarCount = partial(request.get, { url: starCountUrl, headers });

      parallel([requestOrgs, requestUser, requestStars, requestStarCount], (err, [orgs, user, stars, numStars]) => {
        if (err) {
          return reply.view('error', { error: 'Invalid response from Github.' });
        }

        const userInfo = JSON.parse(user[1]);
        const orgsInfo = JSON.parse(orgs[1]);
        const isStarred = stars[0].headers.status === '204 No Content';
        const starCount = JSON.parse(numStars[1]).length;

        const facOrgId = 9970257;
        const isFacMember = orgsInfo.find(org => org.id === facOrgId);

        if (isFacMember) {
          req.cookieAuth.set({
            name: userInfo.name,
            avatar: userInfo.avatar_url,
            access_token,
            isStarred,
            starCount,
          });
          return reply.redirect('/home');
        }

        return reply.view('error', { error: 'You\'re not allowed here.' });
      });
    });
  },
};
