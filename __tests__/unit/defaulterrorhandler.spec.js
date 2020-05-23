const { mockRequest, mockResponse, mockNext } = require('../utils/httpmocks');
const defaultErrorHandler = require('../../src/app/middleware/defaulterrorhandler');

describe('CatchAllErrorHandler', () => {
  let request;
  let response;
  let next;
  let error;
  beforeEach(() => {
    response = mockResponse();
    next = mockNext();
    error = new Error('error');
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = console.error;
  });

  it('Should return a 500 http reponse when an xhr request encouters an internal server error', async () => {
    request = (() => ({
      xhr: true
    }))();
    await defaultErrorHandler(error, request, response, next);
    expect(console.error).toHaveBeenCalledWith(error);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ error: 'Something went wrong!!' });
  });

  it('Should pass on other non-xhr errors to the express inbuilt error handler', async () => {
    request = mockRequest();
    await defaultErrorHandler(error, request, response, next);
    expect(next).toHaveBeenCalled();
  });
});
