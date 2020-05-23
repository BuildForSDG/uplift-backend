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
module.exports = () => {
  const container = new Container();
  require('./app/providers/appprovider')(container);
  return container;
};

/* eslint-enable global-require */
