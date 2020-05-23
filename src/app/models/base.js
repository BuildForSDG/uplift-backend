/* eslint-disable class-methods-use-this */
class BaseModel {
  /**
     *
     * @param {Object} obj - an object with the dependencies for this model.
     *
     * A dependency with the key 'db' is required and it represents the current database instance.
     */
  constructor({ db, table }) {
    this.db = db;
    this.table = () => (table || this.name.toLowerCase());
  }

  /**
     * @returns {Object} object - An object with key value pairs for a
     * database column and the column properties.
     *
     * Override this method to define the columns for the eventual table to be created
     * from this model together with the properties for the column. The object returned
     * should have key/value pairs for the column name and its properties respectively
     */
  fields() {
  }

  /**
     * Returns all the records from the currently attached database table
     */
  all() {
    return [

    ];
  }

  /**
     *
     * @param {*} obj - Parameters to use to perform a search in the database
     * @returns {*} - Results matching the search query
     *
     * Performs a search in the database to locate records matching the provided
     * search query
     */

  find(obj) {
    return obj;
  }

  /**
     *
     * @param {*} obj - The object to create in the database
     *
     * Inserts a record in the current database instance
     */
  save(obj) {
    return obj;
  }
}

module.exports = BaseModel;
