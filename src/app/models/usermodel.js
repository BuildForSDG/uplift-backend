const BaseModel = require('./base');

class User extends BaseModel {
  constructor({ db, name }) {
    super({ db, name });
    this.attributes = {
      firstname: 'VARCHAR(50) NOT NULL',
      lastname: 'VARCHAR(50) NOT NULL',
      username: 'VARCHAR(50) NOT NULL',
      email: 'VARCHAR(100) NOT NULL UNIQUE',
      password: 'VARCHAR(255) NOT NULL'
    };
  }
}

module.exports = User;
