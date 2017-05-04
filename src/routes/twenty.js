module.exports = {
  method: 'GET',
  path: '/twenty',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {
    reply.view('twenty');
  },
};
