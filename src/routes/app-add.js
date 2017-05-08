module.exports = {
  method: 'GET',
  path: '/add',
  handler: (req, reply) => {
    reply.view('add');
  },
};
