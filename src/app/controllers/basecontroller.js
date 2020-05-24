class BaseController {
  constructor({ model }) {
    this.model = model;
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  index() {
    return this.model.all();
  }

  create(obj) {
    return this.model.save(obj);
  }

  read(obj) {
    return this.model.find(obj);
  }

  update(obj) {
    return this.model.update(obj);
  }

  delete(obj) {
    return this.model.delete(obj);
  }
}

module.exports = BaseController;
