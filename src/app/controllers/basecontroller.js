class BaseController {
  constructor({ model }) {
    this.model = model;
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async index(_request, response, next) {
    return this.model.all()
      .then((objs) => response.status(200).json({
        message: 'Success',
        data: objs
      }))
      .catch((error) => next(error));
  }

  async create(request, response, next) {
    const { body } = request;
    return this.model.save(body)
      .then((obj) => response.status(201).json({
        message: 'Object successfully created',
        data: obj
      })).catch((error) => next(error));
  }

  read(request, response, next) {
    const { params } = request;
    return this.model.find(params)
      .then((result) => (result
        ? response.status(200).json({
          data: result
        })
        : response.status(404).json({
          message: 'Resource not found'
        }))).catch((error) => next(error));
  }

  update(request, response, next) {
    const { body } = request;
    return this.model.update(body)
      .then((obj) => response.status(201).json({
        message: 'Object updated successfully',
        data: obj
      })).catch((error) => next(error));
  }

  delete(request, response, next) {
    const { params } = request;
    return this.model.delete(params)
      .then(() => response.status(200).json({
        message: 'Object successfully deleted'
      })).catch((error) => next(error));
  }
}

module.exports = BaseController;
