const container = require('../../src/bootstrap')(
  {
    config_path: `${__dirname}/../../.env.test.cfg`
  }
);

module.exports = {
  container
};
