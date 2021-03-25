const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    await Order.insert({ quantity: 40 });
    await Order.insert({ quantity: 30 });
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '3',
          quantity: 10,
        });
      });
  });

  it('gets all orders in the database', () => {
    return request(app)
      .get('/api/v1/orders')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            quantity: 40,
          },
          {
            id: '2',
            quantity: 30,
          },
        ]);
      });
  });

  it('gets an order by id from database', () => {
    return request(app)
      .get('/api/v1/orders/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 40,
        });
      });
  });

  it('updates an existing order by id and sends a text message', () => {
    return request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 90 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 90,
        });
      });
  });

});
