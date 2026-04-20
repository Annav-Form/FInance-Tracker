export const formatCurrency = (amount, currency = 'INR') => {
  const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
  const sym = symbols[currency] || '₹';
  return `${sym}${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

export const CATEGORIES = {
  expense: ['Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Subscriptions', 'Other'],
  income: ['Salary', 'Freelance', 'Investment', 'Other'],
};

export const ALL_CATEGORIES = [...new Set([...CATEGORIES.expense, ...CATEGORIES.income])];

export const CATEGORY_COLORS = {
  Food: '#ffb830', Travel: '#4d79ff', Rent: '#ff4d6d',
  Shopping: '#b57bee', Entertainment: '#00e5a0', Health: '#ff7850',
  Utilities: '#7cb3ff', Subscriptions: '#d4a8ff', Salary: '#00e5a0',
  Freelance: '#4d79ff', Investment: '#ffb830', Other: '#8888aa',
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatMonthYear = (key) => {
  const [year, month] = key.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
};
