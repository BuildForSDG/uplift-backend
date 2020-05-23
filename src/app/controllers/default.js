/* eslint-disable class-methods-use-this */
const BaseController = require('./basecontroller');

class DefaultController extends BaseController {
  async index(_request, response) {
    return response.status(200).json({
      message: 'Hello from uplift bare skeleton backend'
    });
  }
}

module.exports = DefaultController;
