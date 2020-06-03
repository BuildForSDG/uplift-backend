const request = require('supertest');
const { hashpassword } = require('../../src/app/utils/auth');
const { container } = require('../utils/setup');

const app = container.App;
const model = container.UserModel;

describe('POST /auth/login', () => {
  beforeEach((done) => model.init()
    .then(() => hashpassword('test')
      .then((hash) => model.save({
        firstname: 'test',
        lastname: 'user',
        username: 'test',
        password: hash,
        email: 'test@uplift.com'
      })
        .then(() => done())
        .catch((error) => { throw error; }))
      .catch((error) => { throw error; }))
    .catch((error) => done(error)));

  afterEach((done) => model.tearDown()
    .then(() => done())
    .catch((error) => done(error)));

  it('should return 200 Http response with a token on successful login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'test'
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('token');
    expect(response.body.message).toEqual('Authenticated');
  });

  it('should return 401 Http response when invalid password is provided', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'random'
      });
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Invalid Credentials');
  });

  it('should return 401 Http response when invalid username is provided', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'random',
        password: 'test'
      });
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Invalid Credentials');
  });
});
