const { body } = require('express-validator');

module.exports = (userModel) => [
  body('firstname', 'firstname field is required')
    .exists().bail()
    .not()
    .isEmpty()
    .withMessage('firstname field cannot be empty')
    .bail(),
  body('lastname', 'lastname field is required')
    .exists().bail()
    .not()
    .isEmpty()
    .withMessage('lastname field cannot be empty'),
  body('username')
    .exists().withMessage('username is required')
    .not()
    .isEmpty()
    .withMessage('username field cannot be empty')
    .bail()
    .custom((username) => userModel.findOne({ username })
      .then((user) => {
        if (user) {
          throw Error('That username has already been taken');
        }
        return true;
      })),
  body('email')
    .exists().withMessage('email field is required')
    .not()
    .isEmpty()
    .withMessage('email field cannot be empty')
    .bail()
    .isEmail()
    .withMessage('invalid email provided')
    .bail()
    .custom((email) => userModel.findOne({ email })
      .then((user) => {
        if (user) {
          throw Error('provided email has been taken');
        }
        return true;
      })),
  body('password', 'password field is required')
    .exists().bail()
    .not()
    .isEmpty()
    .withMessage('password field cannot be empty')
];
