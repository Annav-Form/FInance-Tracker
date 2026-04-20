// hooks/useTransactions.js
import { useState, useMemo, useCallback } from 'react';
import { useFinance } from '../context/FinanceContext';

export const useTransactions = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinance();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: 'all', type: 'all', dateFrom: '', dateTo: '' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) || (t.notes && t.notes.toLowerCase().includes(q))
      );
    }

    if (filters.category !== 'all') result = result.filter(t => t.category === filters.category);
    if (filters.type !== 'all') result = result.filter(t => t.type === filters.type);
    if (filters.dateFrom) result = result.filter(t => new Date(t.date) >= new Date(filters.dateFrom));
    if (filters.dateTo) result = result.filter(t => new Date(t.date) <= new Date(filters.dateTo + 'T23:59:59'));

    result.sort((a, b) => {
      let valA, valB;
      if (sortBy === 'date') { valA = new Date(a.date); valB = new Date(b.date); }
      else if (sortBy === 'amount') { valA = a.amount; valB = b.amount; }
      else if (sortBy === 'category') { valA = a.category; valB = b.category; }
      else { valA = a.title; valB = b.title; }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [transactions, search, filters, sortBy, sortOrder]);

  const updateFilter = useCallback((key, val) => setFilters(prev => ({ ...prev, [key]: val })), []);
  const resetFilters = useCallback(() => {
    setFilters({ category: 'all', type: 'all', dateFrom: '', dateTo: '' });
    setSearch('');
  }, []);

  return {
    transactions: filtered, allTransactions: transactions,
    search, setSearch, filters, updateFilter, resetFilters,
    sortBy, setSortBy, sortOrder, setSortOrder,
    addTransaction, updateTransaction, deleteTransaction,
  };
};
