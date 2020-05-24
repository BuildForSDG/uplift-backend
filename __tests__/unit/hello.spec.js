const { mockRequest, mockResponse, mockNext } = require('../utils/httpmocks');
const DefaultController = require('../../src/app/controllers/default');


describe('DefaultController', () => {
  describe('index', () => {
    let request;
    let response;
    let next;
    beforeEach(() => {
      request = mockRequest();
      response = mockResponse();
      next = mockNext();
    });

    it('Returns 200 HTTP response code with the right response message', (done) => {
      const defaultController = new DefaultController({
        model: {
          testDbConnection: jest.fn().mockReturnValue(Promise.resolve())
        }
      });
      return defaultController.index(request, response, next)
        .then((resp) => {
          expect(resp.status).toHaveBeenCalledWith(200);
          expect(resp.json).toHaveBeenCalledWith({ message: 'Hello from uplift bare skeleton backend' });
          done();
        }).catch((error) => done(error));
    });
  });
});
