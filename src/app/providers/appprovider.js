const express = require('express');

const app = express();
const defaultErrorHandler = require('../middleware/defaulterrorhandler');
const TestModel = require('../models/testmodel');
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
  container.service('TestModel', () => new TestModel({ db: container.db }));
  container.service('AppController', () => new AppController({ model: container.TestModel }));
  container.service('IndexRouter', () => indexRouter(container.AppController));

  container.service('App', () => {
    app.use(defaultErrorHandler);
    app.use('/', container.IndexRouter);
    return app;
  });
};

module.exports = AppProvider;
