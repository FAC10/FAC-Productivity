module.exports = {
  method: 'GET',
  path: '/',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {
    reply.view('home');
  },
};
