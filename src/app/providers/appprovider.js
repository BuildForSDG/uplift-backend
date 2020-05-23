const express = require('express');

const app = express();
const defaultErrorHandler = require('../middleware/defaulterrorhandler');
const db = require('../../config/db');
const AppController = require('../controllers/default');
const indexRouter = require('../routes/index');

/**
 *
 * @param {*} container - The container object with which to register dependencies
 *
 * Calls the service method on the IOC container  object to register a dependency
 * with the container. All providers follow the same code structure to register dependecies
 * with the IOC container.
 */
const AppProvider = (container) => {
  container.service('AppController', () => new AppController({}));
  container.service('IndexRouter', () => indexRouter(container.AppController));
  container.service('db', () => db);


  container.service('App', () => {
    app.use(defaultErrorHandler);
    app.use('/', container.IndexRouter);
    return app;
  });
};

module.exports = AppProvider;
