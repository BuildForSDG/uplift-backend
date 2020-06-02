class BaseModel {
  /**
     *
     * @param {Object} obj - an object with the dependencies for this model.
     *
     * This is the base implementation of a model that maps to database table
     * A dependency with the key 'db' is required and it represents the current database instance.
     */
  constructor({ db, name }) {
    this.db = db;
    this.table = name || `${this.constructor.name.toLowerCase()}s`;
    this.init = this.init.bind(this);
    this.all = this.all.bind(this);
    this.find = this.find.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.testDbConnection = this.testDbConnection.bind(this);
  }

  /**
     * @returns {Object} object - An object with key value pairs for a
     * database column and the column properties.
     *
     * Override this method to define the columns for the eventual table to be created
     * from this model together with the properties for the column. The object returned
     * should have key/value pairs for the column name and its properties respectively
     */

  async init() {
    const obj = {
      id: 'SERIAL PRIMARY KEY',
      ...this.attributes
    };
    const columns = () => Object.keys(
      obj
    ).map((key) => {
      if (key === 'foreign_key') {
        return `${obj[key]}`;
      }
      return `${key} ${obj[key]}`;
    });

    const query = `CREATE TABLE IF NOT EXISTS ${this.table} (${columns().join(', ')})`;

    return this.db.any(query);
  }

  /**
     * Returns all the records from the currently attached database table
     */
  async all() {
    return this.db.any('SELECT * FROM $1', [this.table]);
  }

  /**
     *
     * @param {*} obj - Parameters to use to perform a search in the database
     * @returns {*} - Results matching the search query
     *
     * Performs a search in the database to locate records matching the provided
     * search query
     */

  async find(obj) {
    return this.db.any('SELECT * FROM $1 WHERE $2:name = $2:list', [this.table, obj]);
  }

  /**
     *
     * @param {*} obj - The object to create in the database
     *
     * Inserts a record in the current database instance
     */
  async save(obj) {
    return this.db.none('INSERT INTO $1:name($2:name) VALUES($2:list)', [this.table, obj]);
  }

  /**
     *
     * @param {*} obj - The object to delete from the database
     *
     * Deletes a record from the attached database table
     */
  async delete(obj) {
    return this.db.none('DELETE FROM $1:name WHERE $2:name = $2:list', [this.table, obj]);
  }

  async testDbConnection() {
    return this.db.connect()
      .then((obj) => {
        obj.done();
        return true;
      })
      .catch((error) => { throw error; });
  }
}

module.exports = BaseModel;
