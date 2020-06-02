const { mockRequest, mockResponse, mockNext } = require('../utils/httpmocks');
const AuthController = require('../../src/app/controllers/authcontroller');
const authUtils = require('../../src/app/utils/auth');

jest.mock('../../src/app/utils/auth');


describe('AuthController', () => {
  describe('login', () => {
    let request;
    let response;
    let next;
    beforeEach(() => {
      request = mockRequest({
        body: {
          username: 'testuser',
          password: 'testpassword'
        }
      });
      response = mockResponse();
      next = mockNext();
    });

    it('Returns 200 HTTP response code on successful login', (done) => {
      const authController = new AuthController({
        model: {
          findOne: jest.fn().mockReturnValue(Promise.resolve({
            username: 'testuser',
            password: 'testpassword'
          }))
        }
      });
      authUtils.validatePassword.mockResolvedValue(true);
      authUtils.generateToken.mockResolvedValue(true);
      return authController.login(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(200);
          done();
        }).catch((error) => done(error));
    });

    it('Returns 401 Unauthorised response code when password validation fails', (done) => {
      const authController = new AuthController({
        model: {
          findOne: jest.fn().mockReturnValue(Promise.resolve({
            username: 'test',
            password: 'password'
          }))
        }
      });
      authUtils.validatePassword.mockImplementation(() => Promise.resolve(false));
      return authController.login(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(401);
          expect(resp.json).toHaveBeenCalledWith({ message: 'Invalid Credentials' });
          done();
        }).catch((error) => done(error));
    });

    it('Returns 401 Unauthorised response code when no user matching provided credentials exists', (done) => {
      const authController = new AuthController({
        model: {
          findOne: jest.fn().mockReturnValue(Promise.resolve())
        }
      });
      return authController.login(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(401);
          done();
        }).catch((error) => done(error));
    });

    it('Delegates to express for error handling', (done) => {
      const authController = new AuthController({
        model: {
          findOne: jest.fn().mockReturnValue(Promise.resolve({
            username: 'test',
            password: 'password'
          }))
        }
      });
      // authUtils.validatePassword.mockResolvedValue(true);
      authUtils.validatePassword.mockImplementation(() => Promise.reject(Error('Something went wrong!!')));
      return authController.login(request, response, next)
        .then(() => {
          expect(next.mock.calls.length).toBe(1);
          done();
        }).catch((error) => done(error));
    });
  });

  describe('create', () => {
    let request;
    let response;
    let next;
    beforeEach(() => {
      request = mockRequest({
        body: {

        }
      });
      response = mockResponse();
      next = mockNext();
    });

    it('Returns 201 HTTP response code with the right response message', (done) => {
      const baseController = new AuthController({
        model: {
          save: jest.fn().mockReturnValue(Promise.resolve())
        }
      });

      authUtils.hashpassword.mockResolvedValue('password');
      return baseController.create(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(201);
          expect(resp.json).toHaveBeenCalledWith({ message: 'New user successfully created' });
          done();
        }).catch((error) => done(error));
    });

    it('Delegates to express for error handling', (done) => {
      const baseController = new AuthController({
        model: {
          save: jest.fn().mockReturnValue(Promise.reject(Error('Something went wrong!!')))
        }
      });

      authUtils.hashpassword.mockResolvedValue('password');
      return baseController.create(request, response, next)
        .then(() => {
          expect(next.mock.calls.length).toBe(1);
          done();
        }).catch((error) => done(error));
    });
  });
});
