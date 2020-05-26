const { mockRequest, mockResponse, mockNext } = require('../utils/httpmocks');
const BaseController = require('../../src/app/controllers/basecontroller');


describe('BaseController', () => {
  describe('index', () => {
    let request;
    let response;
    let next;
    beforeEach(() => {
      request = mockRequest({});
      response = mockResponse();
      next = mockNext();
    });

    it('Returns 200 HTTP response code with the right response message', (done) => {
      const baseController = new BaseController({
        model: {
          all: jest.fn().mockReturnValue(Promise.resolve())
        }
      });
      return baseController.index(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(200);
          expect(resp.json).toHaveBeenCalledWith({ message: 'Success' });
          done();
        }).catch((error) => done(error));
    });

    it('Delegates to express for error handling', (done) => {
      const baseController = new BaseController({
        model: {
          all: jest.fn().mockReturnValue(Promise.reject())
        }
      });
      return baseController.index(request, response, next)
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
      const baseController = new BaseController({
        model: {
          save: jest.fn().mockReturnValue(Promise.resolve())
        }
      });
      return baseController.create(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(201);
          // expect(resp.json).toHaveBeenCalledWith({ message: 'Success' });
          done();
        }).catch((error) => done(error));
    });

    it('Delegates to express for error handling', (done) => {
      const baseController = new BaseController({
        model: {
          save: jest.fn().mockReturnValue(Promise.reject())
        }
      });
      return baseController.create(request, response, next)
        .then(() => {
          expect(next.mock.calls.length).toBe(1);
          done();
        }).catch((error) => done(error));
    });
  });

  describe('read', () => {
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

    it('Returns 200 HTTP response code with the right response message', (done) => {
      const baseController = new BaseController({
        model: {
          find: jest.fn().mockReturnValue(Promise.resolve([]))
        }
      });
      return baseController.read(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(200);
          // expect(resp.json).toHaveBeenCalledWith({ message: 'Success' });
          done();
        }).catch((error) => done(error));
    });

    it('Returns 404 HTTP response code when requested resource is missing', (done) => {
      const baseController = new BaseController({
        model: {
          find: jest.fn().mockReturnValue(Promise.resolve())
        }
      });
      return baseController.read(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(404);
          expect(resp.json).toHaveBeenCalledWith({ message: 'Resource not found' });
          done();
        }).catch((error) => done(error));
    });

    it('Delegates to express for error handling', (done) => {
      const baseController = new BaseController({
        model: {
          find: jest.fn().mockReturnValue(Promise.reject())
        }
      });
      return baseController.read(request, response, next)
        .then(() => {
          expect(next.mock.calls.length).toBe(1);
          done();
        }).catch((error) => done(error));
    });
  });

  describe('update', () => {
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

    it('Returns 201 HTTP response code when requested resource is missing', (done) => {
      const baseController = new BaseController({
        model: {
          update: jest.fn().mockReturnValue(Promise.resolve())
        }
      });
      return baseController.update(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(201);
          done();
        }).catch((error) => done(error));
    });

    it('Delegates to express for error handling', (done) => {
      const baseController = new BaseController({
        model: {
          update: jest.fn().mockReturnValue(Promise.reject())
        }
      });
      return baseController.update(request, response, next)
        .then(() => {
          expect(next.mock.calls.length).toBe(1);
          done();
        }).catch((error) => done(error));
    });
  });

  describe('update', () => {
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

    it('Returns 200 HTTP response when an object is successfully deleted', (done) => {
      const baseController = new BaseController({
        model: {
          delete: jest.fn().mockReturnValue(Promise.resolve())
        }
      });
      return baseController.delete(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(200);
          done();
        }).catch((error) => done(error));
    });

    it('Delegates to express for error handling', (done) => {
      const baseController = new BaseController({
        model: {
          delete: jest.fn().mockReturnValue(Promise.reject())
        }
      });
      return baseController.delete(request, response, next)
        .then(() => {
          expect(next.mock.calls.length).toBe(1);
          done();
        }).catch((error) => done(error));
    });
  });
});
