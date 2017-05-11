module.exports = {
  method: 'GET',
  path: '/wifipwd',
  handler: (req, reply) => {
    reply.view('wifipwd');
  },
};
