module.exports = {
  method: 'GET',
  path: '/pomodoro',
  handler: (req, reply) => {
    reply.view('pomodoro');
  },
};
