// Proper way to initialize and share the Database object

// Loading and initializing the library:
const pgp = require('pg-promise')({
});
// Preparing the connection details:
const cn = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_USER_PASSWORD
};

// Creating a new database instance from the connection details:
const db = pgp(cn);

// Exporting the database object for shared use:
module.exports = db;
