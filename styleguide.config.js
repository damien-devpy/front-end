const path = require('path');
module.exports = {
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'src/custom_bootstrap/bootstrap.css',
        },
      ],
    },
  },
  require: [path.resolve(__dirname, 'styleguide.setup.js')],
};
