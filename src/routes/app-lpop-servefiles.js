module.exports = {
  method: 'GET',
  path: '/admin/{param*}',
  handler: {
    directory: {
      path: './public/build',
      redirectToSlash: true,
      index: true,
    },
  },
};
