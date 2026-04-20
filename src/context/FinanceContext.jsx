import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const FinanceContext = createContext(null);

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance_transactions',
  BUDGET: 'finance_budget',
};

const SAMPLE_TRANSACTIONS = [
  { id: uuidv4(), title: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income', date: new Date(2024, 1, 1).toISOString(), notes: 'February salary', recurring: true },
  { id: uuidv4(), title: 'Freelance Project', amount: 25000, category: 'Freelance', type: 'income', date: new Date(2024, 1, 5).toISOString(), notes: 'Web dev project', recurring: false },
  { id: uuidv4(), title: 'Apartment Rent', amount: 18000, category: 'Rent', type: 'expense', date: new Date(2024, 1, 3).toISOString(), notes: 'February rent', recurring: true },
  { id: uuidv4(), title: 'Groceries', amount: 3500, category: 'Food', type: 'expense', date: new Date(2024, 1, 7).toISOString(), notes: 'Weekly groceries', recurring: false },
  { id: uuidv4(), title: 'Netflix', amount: 649, category: 'Subscriptions', type: 'expense', date: new Date(2024, 1, 8).toISOString(), notes: 'Monthly subscription', recurring: true },
  { id: uuidv4(), title: 'Spotify', amount: 119, category: 'Subscriptions', type: 'expense', date: new Date(2024, 1, 8).toISOString(), notes: 'Music subscription', recurring: true },
  { id: uuidv4(), title: 'Zomato Order', amount: 850, category: 'Food', type: 'expense', date: new Date(2024, 1, 10).toISOString(), notes: 'Dinner delivery', recurring: false },
  { id: uuidv4(), title: 'Metro Card Recharge', amount: 500, category: 'Travel', type: 'expense', date: new Date(2024, 1, 12).toISOString(), notes: 'Monthly commute', recurring: true },
  { id: uuidv4(), title: 'Shopping - Amazon', amount: 4200, category: 'Shopping', type: 'expense', date: new Date(2024, 1, 14).toISOString(), notes: 'Electronics accessories', recurring: false },
  { id: uuidv4(), title: 'Gym Membership', amount: 1500, category: 'Health', type: 'expense', date: new Date(2024, 1, 1).toISOString(), notes: 'Monthly gym', recurring: true },
  { id: uuidv4(), title: 'Electricity Bill', amount: 1200, category: 'Utilities', type: 'expense', date: new Date(2024, 1, 15).toISOString(), notes: 'BESCOM bill', recurring: true },
  { id: uuidv4(), title: 'Movie Tickets', amount: 600, category: 'Entertainment', type: 'expense', date: new Date(2024, 1, 17).toISOString(), notes: 'Weekend outing', recurring: false },
  { id: uuidv4(), title: 'Doctor Visit', amount: 800, category: 'Health', type: 'expense', date: new Date(2024, 1, 20).toISOString(), notes: 'General checkup', recurring: false },
  { id: uuidv4(), title: 'Investment Returns', amount: 5000, category: 'Investment', type: 'income', date: new Date(2024, 1, 22).toISOString(), notes: 'Mutual fund SIP returns', recurring: false },
  { id: uuidv4(), title: 'Internet Bill', amount: 799, category: 'Utilities', type: 'expense', date: new Date(2024, 1, 25).toISOString(), notes: 'Broadband plan', recurring: true },
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return stored ? JSON.parse(stored) : SAMPLE_TRANSACTIONS;
    } catch { return SAMPLE_TRANSACTIONS; }
  });

  const [budget, setBudget] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BUDGET);
      return stored ? JSON.parse(stored) : { monthlyBudget: 50000 };
    } catch { return { monthlyBudget: 50000 }; }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(budget));
  }, [budget]);

  const addTransaction = useCallback((data) => {
    const newTransaction = { ...data, id: uuidv4(), date: new Date(data.date).toISOString() };
    setTransactions(prev => [newTransaction, ...prev]);
    toast.success('Transaction added successfully!');
    return newTransaction;
  }, []);

  const updateTransaction = useCallback((id, data) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...data, date: new Date(data.date).toISOString() } : t)
    );
    toast.success('Transaction updated!');
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast.success('Transaction deleted.');
  }, []);

  const updateBudget = useCallback((newBudget) => {
    setBudget({ monthlyBudget: Number(newBudget) });
    toast.success('Budget updated!');
  }, []);

  const getAnalytics = useCallback(() => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpenses;

    const expenseByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const topCategory = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1])[0];

    const monthlyData = {};
    transactions.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[key]) monthlyData[key] = { income: 0, expense: 0, month: key };
      monthlyData[key][t.type] += t.amount;
    });

    const sortedMonths = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
    const categoryPieData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

    return { totalIncome, totalExpenses, netBalance, topCategory, monthlyData: sortedMonths, categoryPieData, expenseByCategory };
  }, [transactions]);

  return (
    <FinanceContext.Provider value={{
      transactions, addTransaction, updateTransaction, deleteTransaction,
      budget, updateBudget,
      isLoading, setIsLoading,
      currency, setCurrency,
      exchangeRates, setExchangeRates,
      getAnalytics,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
};

export default FinanceContext;
