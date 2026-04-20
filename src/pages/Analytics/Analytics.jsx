import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdTrendingUp, MdTrendingDown, MdSwapVert, MdPublic } from 'react-icons/md';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, CATEGORY_COLORS } from '../../utils/currencyFormatter';
import { SpendingPieChart, MonthlyLineChart, IncomeExpenseBarChart } from '../../components/Charts/Charts';
import StatCard from '../../components/StatCard';
import { fetchExchangeRates } from '../../services/api';
import './Analytics.css';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY'];

const Analytics = () => {
  const { getAnalytics, currency, setCurrency, setExchangeRates } = useFinance();
  const { totalIncome, totalExpenses, netBalance, topCategory, monthlyData, categoryPieData, expenseByCategory } = getAnalytics();
  const [rates, setRates] = useState({});
  const [loadingRates, setLoadingRates] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  useEffect(() => {
    setLoadingRates(true);
    fetchExchangeRates().then(r => {
      setRates(r);
      setExchangeRates(r);
      setLoadingRates(false);
    });
  }, []);

  const convertAmount = (amount) => {
    if (selectedCurrency === 'INR') return formatCurrency(amount, 'INR');
    const rate = rates[selectedCurrency] || 1;
    const converted = amount * rate;
    const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥' };
    return `${symbols[selectedCurrency] || selectedCurrency}${converted.toLocaleString('en', { maximumFractionDigits: 2 })}`;
  };

  const recurringExpenses = useFinance().transactions?.filter(t => t.type === 'expense' && t.recurring) || [];
  const { transactions } = useFinance();
  const recurring = transactions.filter(t => t.recurring);

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Deep dive into your financial patterns</p>
        </div>
        {/* Currency Selector */}
        <div className="currency-selector">
          <MdPublic className="currency-icon" />
          <select
            className="form-select"
            value={selectedCurrency}
            onChange={e => setSelectedCurrency(e.target.value)}
            style={{ width: 120 }}
          >
            <option value="INR">₹ INR</option>
            {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {loadingRates && <span className="text-xs text-muted">Loading rates...</span>}
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid-4 mb-24">
        <StatCard label="Total Income" value={convertAmount(totalIncome)} icon={<MdTrendingUp />} color="green" index={0} />
        <StatCard label="Total Expenses" value={convertAmount(totalExpenses)} icon={<MdTrendingDown />} color="red" index={1} />
        <StatCard label="Net Savings" value={convertAmount(Math.abs(netBalance))} icon={<MdSwapVert />} color={netBalance >= 0 ? 'blue' : 'red'} subtitle={netBalance >= 0 ? 'Savings' : 'Deficit'} index={2} />
        <StatCard label="Recurring Items" value={recurring.length} icon={<MdTrendingUp />} color="purple" subtitle={`${recurring.filter(t=>t.type==='expense').length} expenses`} index={3} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid-2 mb-24">
        <div className="card">
          <div className="card-header-an"><h2 className="card-title">Spending by Category</h2></div>
          <SpendingPieChart data={categoryPieData} />
        </div>
        <div className="card">
          <div className="card-header-an"><h2 className="card-title">Monthly Trend</h2></div>
          <MonthlyLineChart data={monthlyData} />
        </div>
      </div>

      {/* Bar Chart full width */}
      <div className="card mb-24">
        <div className="card-header-an"><h2 className="card-title">Income vs Expense Comparison</h2></div>
        <IncomeExpenseBarChart data={monthlyData} />
      </div>

      {/* Recurring Expenses */}
      <div className="card mb-24">
        <div className="card-header-an"><h2 className="card-title">Recurring Transactions</h2></div>
        {recurring.length === 0 ? (
          <div className="empty-state"><div className="empty-state-icon">🔄</div><p>No recurring transactions found</p></div>
        ) : (
          <div className="recurring-grid">
            {recurring.map((t, i) => (
              <motion.div key={t.id} className={`recurring-item ${t.type}`}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <div className="recurring-name">{t.title}</div>
                <div className="recurring-cat">{t.category}</div>
                <div className={`recurring-amt ${t.type}`}>
                  {t.type === 'expense' ? '-' : '+'}{convertAmount(t.amount)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Category Table */}
      <div className="card">
        <div className="card-header-an"><h2 className="card-title">Category Summary</h2></div>
        {Object.keys(expenseByCategory).length === 0 ? (
          <div className="empty-state"><div className="empty-state-icon">📊</div><p>No expense data</p></div>
        ) : (
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Spent</th>
                <th>% of Expenses</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(expenseByCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, amt]) => (
                  <tr key={cat}>
                    <td>
                      <span className="cat-dot" style={{ background: CATEGORY_COLORS[cat] || '#8888aa' }} />
                      {cat}
                    </td>
                    <td>{convertAmount(amt)}</td>
                    <td>
                      <div className="table-pct-row">
                        <div className="table-pct-bar">
                          <div className="table-pct-fill" style={{ width: `${(amt / totalExpenses) * 100}%`, background: CATEGORY_COLORS[cat] || '#8888aa' }} />
                        </div>
                        <span>{totalExpenses > 0 ? ((amt / totalExpenses) * 100).toFixed(1) : 0}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Analytics;
