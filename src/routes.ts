import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import accountService from './accountService';

const router = express.Router();


router.get('/accounts', (req: Request, res: Response) => {
  const accounts = accountService.getAllAccounts();
  res.json(accounts);
});

router.post("/accounts", (req: Request, res: Response) => {
  const { name, initialBalance } = req.body;
  try {
    const account = accountService.createAccount(name, initialBalance);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/accounts/:id", (req: Request, res: Response) => {
  try {
    const account = accountService.getAccount(req.params.id);
    res.json(account);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

router.post("/accounts/:id/deposit", (req: Request, res: Response) => {
  const { amount } = req.body;
  try {
    const account = accountService.deposit(req.params.id, amount);
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post("/accounts/:id/withdraw", (req: Request, res: Response) => {
  const { amount } = req.body;
  try {
    const account = accountService.withdraw(req.params.id, amount);
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post("/transfer", (req: Request, res: Response) => {
  const { fromId, toId, amount } = req.body;
  try {
    const result = accountService.transfer(fromId, toId, amount);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
