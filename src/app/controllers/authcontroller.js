const BaseController = require('./basecontroller');
const authUtils = require('../utils/auth');

class AuthController extends BaseController {
  constructor({ model }) {
    super({ model });
    this.login = this.login.bind(this);
  }

  async login(request, response, next) {
    const { username, password } = request.body;
    return this.model.findOne({ username })
      .then((user) => (
        user
          ? authUtils.validatePassword(password, user.password)
            .then((valid) => (
              valid
                ? response.status(200).json({
                  message: 'Authenticated',
                  token: authUtils.generateToken(user)
                })
                : response.status(401).json({
                  message: 'Invalid Credentials'
                })
            ))
            .catch((error) => { throw error; })
          : response.status(401).json({
            message: 'Invalid Credentials'
          })
      ))
      .catch((error) => next(error));
  }

  async create(request, response, next) {
    const { body } = request;
    return authUtils.hashpassword(body.password)
      .then((hash) => {
        const user = { ...body, password: hash };
        return this.model.save(user)
          .then(() => (
            response.status(201).json({
              message: 'New user successfully created'
            })
          ))
          .catch((error) => { throw error; });
      })
      .catch((error) => next(error));
  }
}

module.exports = AuthController;
