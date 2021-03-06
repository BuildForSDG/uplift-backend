/* eslint-disable global-require */
const Container = require('./container');
/**
 * Firing up the engines!!!
 *
 *
 * This is the heart of the applications. From here, the entire
 * application comes to life. All the providers defined in the providers
 * directory need to be required here
 */
module.exports = (options) => {
  const container = new Container(options);
  require('./app/providers/appprovider')(container);
  require('./app/providers/databaseprovider')(container);
  require('./app/providers/authprovider')(container);
  return container;
};

/* eslint-enable global-require */
