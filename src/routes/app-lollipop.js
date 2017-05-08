module.exports = {
  method: 'GET',
  path: '/lollipop',
  handler: (req, reply) => {
    reply.view('lollipop');
  },
};
