module.exports = {
  method: 'GET',
  path: '/{file*}',
  config: {
    auth: false,
  },
  handler: {
    directory: {
      path: './public',
    },
  },
};
