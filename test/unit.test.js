const accountService = require('../src/accountService');

describe('AccountService', () => {
  beforeEach(() => {
    accountService.accounts.clear();
    accountService.transactions.clear();
  });

  test('createAccount should create a new account', () => {
    const account = accountService.createAccount('John Doe', 100);
    expect(account).toHaveProperty('id');
    expect(account.name).toBe('John Doe');
    expect(account.balance).toBe(100);
  });

  test('createAccount should throw error for negative balance', () => {
    expect(() => accountService.createAccount('John Doe', -100)).toThrow('Initial balance cannot be negative');
  });

  test('deposit should increase account balance', () => {
    const account = accountService.createAccount('John Doe', 100);
    const updatedAccount = accountService.deposit(account.id, 50);
    expect(updatedAccount.balance).toBe(150);
  });

  test('withdraw should decrease account balance', () => {
    const account = accountService.createAccount('John Doe', 100);
    const updatedAccount = accountService.withdraw(account.id, 50);
    expect(updatedAccount.balance).toBe(50);
  });

  test('withdraw should throw error for insufficient funds', () => {
    const account = accountService.createAccount('John Doe', 100);
    expect(() => accountService.withdraw(account.id, 150)).toThrow('Insufficient funds');
  });

  test('transfer should move money between accounts', () => {
    const account1 = accountService.createAccount('John Doe', 100);
    const account2 = accountService.createAccount('Jane Doe', 50);
    const result = accountService.transfer(account1.id, account2.id, 30);
    expect(result.fromAccount.balance).toBe(70);
    expect(result.toAccount.balance).toBe(80);
    expect(result.transaction).toHaveProperty('id');
  });
});
