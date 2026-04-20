import { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export const useBudget = () => {
  const { transactions, budget, updateBudget } = useFinance();

  const currentMonthExpenses = useMemo(() => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    return transactions
      .filter(t => t.type === 'expense' && isWithinInterval(new Date(t.date), { start, end }))
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const remaining = budget.monthlyBudget - currentMonthExpenses;
  const percentage = budget.monthlyBudget > 0 ? Math.min((currentMonthExpenses / budget.monthlyBudget) * 100, 100) : 0;
  const isOverBudget = currentMonthExpenses > budget.monthlyBudget;

  const categoryBreakdown = useMemo(() => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    const map = {};
    transactions
      .filter(t => t.type === 'expense' && isWithinInterval(new Date(t.date), { start, end }))
      .forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.entries(map)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return { budget, updateBudget, currentMonthExpenses, remaining, percentage, isOverBudget, categoryBreakdown };
};
