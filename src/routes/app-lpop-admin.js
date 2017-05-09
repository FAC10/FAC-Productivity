module.exports = {
  method: 'GET',
  path: '/lpop-admin',
  handler: (req, reply) => {
    reply.view('lpop-admin');
  },
};
