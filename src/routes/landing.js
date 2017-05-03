module.exports = {
  method: 'GET',
  path: '/landing',
  handler: (req, reply) => {
    reply.view('landing');
  },
};
