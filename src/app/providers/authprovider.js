const UserModel = require('../models/usermodel');
const AuthController = require('../controllers/authcontroller');
const userCreationRules = require('../validationrules/usercreation');
const authRouter = require('../routes/auth');

const AuthProvider = (container) => {
  container.service('UserModel', () => new UserModel({ db: container.db }));
  container.service('AuthController', () => new AuthController({ model: container.UserModel }));
  container.service('UserCreationValidator', () => container.Validator(userCreationRules(container.UserModel)));
  container.service('authRouter', () => authRouter({
    controller: container.AuthController,
    middleware: {
      usercreationValidator: container.UserCreationValidator
    }
  }));
  container.App.use('/auth/', container.authRouter);
};

module.exports = AuthProvider;
