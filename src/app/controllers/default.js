const BaseController = require('./basecontroller');

class DefaultController extends BaseController {
  async index(_request, response, next) {
    try {
      return response.status(200).json({
        message: 'Hello from uplift bare skeleton backend'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DefaultController;
