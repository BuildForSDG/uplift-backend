const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const defaultErrorHandler = require('../middleware/defaulterrorhandler');
const UserModel = require('../models/usermodel');
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
  container.service('UserModel', () => new UserModel({ db: container.db }));
  container.service('AppController', () => new AppController({ model: container.UserModel }));
  container.service('IndexRouter', () => indexRouter(container.AppController));

  container.service('App', () => {
    app.use(defaultErrorHandler);
    app.use(bodyparser.json());
    app.use('/', container.IndexRouter);
    return app;
  });
};

module.exports = AppProvider;
