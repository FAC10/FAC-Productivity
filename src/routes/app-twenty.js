module.exports = {
  method: 'GET',
  path: '/twenty',
  handler: (req, reply) => {
    reply.view('twenty');
  },
};
