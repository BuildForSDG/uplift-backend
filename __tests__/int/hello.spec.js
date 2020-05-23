const request = require('supertest');
const createContainer = require('../../src/bootstrap');

describe('GET /', () => {
  it("should return 'Hello from uplift bare skeleton backend'", async () => {
    const container = createContainer();
    const app = container.App;
    const response = await request(app)
      .get('/');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Hello from uplift bare skeleton backend');
  });
});
