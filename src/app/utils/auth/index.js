const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.generateToken = ({ username }) => jwt.sign(
  {
    username
  },
  process.env.SECRET_KEY || 'secret',
  {
    expiresIn: '1h'
  }
);

exports.hashpassword = (password) => bcrypt.hash(password, 10);

exports.validatePassword = (password, hash) => bcrypt.compare(password, hash);
