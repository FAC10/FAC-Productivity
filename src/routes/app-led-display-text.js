module.exports = {
  method: 'GET',
  path: '/display-text',
  handler: (req, reply) => {
    reply.view('display-text');
  },
};
