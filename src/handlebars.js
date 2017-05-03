const handlebars = require('handlebars');

module.exports = {
  engines: {
    hbs: handlebars,
  },
  path: 'views',
  relativeTo: __dirname,
  layout: 'default',
  layoutPath: 'views/layouts',
  partialsPath: 'views/partials',
  helpersPath: 'views/helpers',
};
