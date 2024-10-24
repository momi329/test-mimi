const request = require('supertest');
const app = require('../src/server');

describe('Bank API', () => {
  let account1Id, account2Id;

  test('POST /api/accounts should create a new account', async () => {
    const res = await request(app)
      .post('/api/accounts')
      .send({ name: 'John Doe', initialBalance: 100 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('John Doe');
    expect(res.body.balance).toBe(100);
    account1Id = res.body.id;
  });

  test('GET /api/accounts/:id should return account details', async () => {
    const res = await request(app).get(`/api/accounts/${account1Id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(account1Id);
    expect(res.body.name).toBe('John Doe');
    expect(res.body.balance).toBe(100);
  });

  test('POST /api/accounts/:id/deposit should increase account balance', async () => {
    const res = await request(app)
      .post(`/api/accounts/${account1Id}/deposit`)
      .send({ amount: 50 });
    expect(res.statusCode).toBe(200);
    expect(res.body.balance).toBe(150);
  });

  test('POST /api/accounts/:id/withdraw should decrease account balance', async () => {
    const res = await request(app)
      .post(`/api/accounts/${account1Id}/withdraw`)
      .send({ amount: 30 });
    expect(res.statusCode).toBe(200);
    expect(res.body.balance).toBe(120);
  });

  test('POST /api/transfer should transfer money between accounts', async () => {
    // Create second account
    const createRes = await request(app)
      .post('/api/accounts')
      .send({ name: 'Jane Doe', initialBalance: 50 });
    account2Id = createRes.body.id;

    const res = await request(app)
      .post('/api/transfer')
      .send({ fromId: account1Id, toId: account2Id, amount: 20 });
    expect(res.statusCode).toBe(200);
    expect(res.body.fromAccount.balance).toBe(100);
    expect(res.body.toAccount.balance).toBe(70);
    expect(res.body.transaction).toHaveProperty('id');
  });

  test('GET /api/accounts/:id/transactions should return account transactions', async () => {
    const res = await request(app).get(`/api/accounts/${account1Id}/transactions`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].fromId).toBe(account1Id);
    expect(res.body[0].toId).toBe(account2Id);
    expect(res.body[0].amount).toBe(20);
  });
});
