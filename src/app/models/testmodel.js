const BaseModel = require('./base');

class Test extends BaseModel {
  constructor({ db, name }) {
    super({ db, name });
    this.attributes = {
      name: 'VARCHAR'
    };
  }
}

module.exports = Test;
