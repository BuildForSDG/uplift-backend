const UserModel = require('../models/usermodel');
const AuthController = require('../controllers/authcontroller');
const authRouter = require('../routes/auth');

const AuthProvider = (container) => {
  container.service('UserModel', () => new UserModel({ db: container.db }));
  container.service('AuthController', () => new AuthController({ model: container.UserModel }));
  container.service('authRouter', () => authRouter(container.AuthController));
  container.App.use('/auth/', container.authRouter);
};

module.exports = AuthProvider;
