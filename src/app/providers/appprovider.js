const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const defaultErrorHandler = require('../middleware/defaulterrorhandler');

/**
 *
 * @param {*} container - The container object with which to register dependencies
 *
 * Calls the service method on the IOC container  object to register a dependency
 * with the container. All providers follow the same code structure to register dependecies
 * with the IOC container.
 */
const AppProvider = (container) => {
  container.service('App', () => {
    app.use(defaultErrorHandler);
    app.use(bodyparser.json());

    /**
    * Default initial route intended to test the application.
    * Ideally no route should be defined here.
    *
    */
    app.use('/', (_request, response) => (
      response.status(200).json({
        message: 'Hello from uplift bare skeleton backend'
      })));
    return app;
  });
};
module.exports = AppProvider;
