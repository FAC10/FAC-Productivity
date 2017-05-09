module.exports = {
  method: 'GET',
  path: '/lpop',
  handler: (req, reply) => {
    reply.view('lpop');
  },
};
