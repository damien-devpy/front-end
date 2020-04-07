const path = require('path');
module.exports = {
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'node_modules/bootstrap/dist/css/bootstrap.css',
        },
      ],
    },
  },
  require: [path.resolve(__dirname, 'styleguide.setup.js')],
};
