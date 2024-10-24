export interface Account {
  id: string;
  name: string;
  balance: number;
}

export interface Transaction {
  id: string;
  fromId: string;
  toId: string;
  amount: number;
  timestamp: string;
}