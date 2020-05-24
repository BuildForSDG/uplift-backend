
const db = require('../../config/db');

/**
 *
 * @param {*} container - The container object with which to register dependencies
 *
 * Calls the service method on the IOC container  object to register a dependency
 * with the container. All providers follow the same code structure to register dependecies
 * with the IOC container.
 */
const DatabaseProvider = (container) => {
  container.service('db', () => db);
};

module.exports = DatabaseProvider;
