import { v4 as uuidv4 } from 'uuid';
import { Account, Transaction } from './types'

class AccountService {
  private accounts: Map<string, Account> = new Map();
  private transactions: Map<string, Transaction> = new Map();
  
  initializeDummyData(): void {
    const dummyAccounts = [
      { name: "Tracy", balance: 5000 },
      { name: "Lindy", balance: 3500 },
      { name: "Catharine", balance: 2000 },
      { name: "Victoria", balance: 10000 },
      { name: "Joann", balance: 7500 }
    ];

    dummyAccounts.forEach(account => {
      this.createAccount(account.name, account.balance);
    });

    console.log("accounts init:",this.getAllAccounts());
  }

  createAccount(name: string, initialBalance: number): Account {
    if (initialBalance < 0) {
      throw new Error('❎不可以是負數❎');
    }
    const id = uuidv4();
    const account: Account = { id, name, balance: initialBalance };
    this.accounts.set(id, account);
    return account;
  }

  getAccount(id: string): Account {
    const account = this.accounts.get(id);
    if (!account) {
      throw new Error('❎找不到帳號❎');
    }
    return account;
  }

  deposit(id: string, amount: number): Account {
    const account = this.getAccount(id);
    account.balance += amount;
    return account;
  }

  withdraw(id: string, amount: number): Account {
    const account = this.getAccount(id);
    if (account.balance < amount) {
      throw new Error('Insufficient funds');
    }
    account.balance -= amount;
    return account;
  }

  transfer(fromId: string, toId: string, amount: number): { fromAccount: Account; toAccount: Account; transaction: Transaction } {
    const fromAccount = this.getAccount(fromId);
    const toAccount = this.getAccount(toId);
    
    if (fromAccount.balance < amount) {
      throw new Error('🤑餘額不足🤑');
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    const transactionId = uuidv4();
    const transaction: Transaction = {
      id: transactionId,
      fromId,
      toId,
      amount,
      timestamp: new Date().toISOString()
    };
    this.transactions.set(transactionId, transaction);

    return { fromAccount, toAccount, transaction };
  }

  getTransactions(accountId: string): Transaction[] {
    return Array.from(this.transactions.values()).filter(
      t => t.fromId === accountId || t.toId === accountId
    );
  }

  getAllAccounts(): Account[] {
    return Array.from(this.accounts.values());
  }
}

export default new AccountService();
