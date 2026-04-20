import { useFinance } from '../context/FinanceContext';

export const useCurrency = () => {
  const { currency, exchangeRates } = useFinance();

  const format = (amount, curr = 'INR') => {
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥' };
    const sym = symbols[curr] || curr;
    if (curr === 'JPY') return `${sym}${Math.round(amount).toLocaleString()}`;
    return `${sym}${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const convert = (amount, fromCurr = 'INR', toCurr = currency) => {
    if (fromCurr === toCurr || !exchangeRates) return amount;
    const rate = exchangeRates[toCurr] || 1;
    return amount * rate;
  };

  return { format, convert, currency };
};
