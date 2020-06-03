/* eslint-disable no-shadow */
const request = require('supertest');
const { container } = require('../utils/setup');

const app = container.App;
const model = container.UserModel;

describe('POST /auth/signup', () => {
  beforeEach((done) => model.init()
    .then(() => done())
    .catch((error) => done(error)));

  afterEach((done) => model.tearDown()
    .then(() => done())
    .catch((error) => done(error)));

  it('Should return 200 Ok http reponse on successful user signup', () => request(app)
    .post('/auth/signup')
    .send({
      firstname: 'test',
      lastname: 'user',
      username: 'test',
      email: 'test@uplift.com',
      password: 'test'
    }).then((response) => {
      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('New user successfully created');
    }));

  it('Should return validation error when an already taken email address is part of the request body', () => request(app)
    .post('/auth/signup')
    .send({
      firstname: 'test',
      lastname: 'test',
      username: 'test',
      email: 'test@uplift.com',
      password: 'test'
    })
    .then((response) => {
      expect(response.statusCode).toEqual(201);
      return request(app)
        .post('/auth/signup')
        .send({
          firstname: 'test',
          lastname: 'test',
          username: 'test',
          email: 'test@uplift.com',
          password: 'test'
        })
        .then((response) => {
          expect(response.statusCode).toEqual(422);
        });
    }));
});
