module.exports = {
  method: 'GET',
  path: '/home',
  handler: (req, reply) => {
    reply.view('home');
  },
};
