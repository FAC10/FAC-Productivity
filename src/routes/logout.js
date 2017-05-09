module.exports = {
  method: 'GET',
  path: '/logout',
  config: {
    handler: (req, reply) => {
      req.cookieAuth.clear();
      reply.redirect('home');
    },
  },
};
