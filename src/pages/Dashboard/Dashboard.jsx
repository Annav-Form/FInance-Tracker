import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdTrendingUp, MdTrendingDown, MdAccountBalance, MdCategory, MdAdd, MdArrowForward } from 'react-icons/md';
import { useFinance } from '../../context/FinanceContext';
import { useBudget } from '../../hooks/useHooks';
import { formatCurrency } from '../../utils/currencyFormatter';
import StatCard from '../../components/StatCard';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import { SpendingPieChart, MonthlyLineChart } from '../../components/Charts/Charts';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import { fetchFinancialNews } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { getAnalytics, transactions, deleteTransaction } = useFinance();
  const { budget, currentMonthExpenses, remaining, percentage, isOverBudget } = useBudget();
  const [news, setNews] = useState([]);
  const { totalIncome, totalExpenses, netBalance, topCategory, monthlyData, categoryPieData } = getAnalytics();

  useEffect(() => {
    fetchFinancialNews().then(setNews);
  }, []);

  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Your financial overview at a glance</p>
        </div>
        <Link to="/transactions/new" className="btn btn-primary">
          <MdAdd /> Add Transaction
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid-4 mb-24">
        <StatCard label="Total Income" value={formatCurrency(totalIncome)} icon={<MdTrendingUp />} color="green" subtitle="All time" index={0} />
        <StatCard label="Total Expenses" value={formatCurrency(totalExpenses)} icon={<MdTrendingDown />} color="red" subtitle="All time" index={1} />
        <StatCard label="Net Balance" value={formatCurrency(Math.abs(netBalance))} icon={<MdAccountBalance />} color={netBalance >= 0 ? 'blue' : 'red'} subtitle={netBalance >= 0 ? 'Savings' : 'Deficit'} index={2} />
        <StatCard label="Top Category" value={topCategory ? topCategory[0] : '—'} icon={<MdCategory />} color="amber" subtitle={topCategory ? formatCurrency(topCategory[1]) : 'No expenses'} index={3} />
      </div>

      {/* Budget Overview */}
      <div className="grid-2 mb-24">
        <BudgetCard
          monthlyBudget={budget.monthlyBudget}
          spent={currentMonthExpenses}
          remaining={remaining}
          percentage={percentage}
          isOverBudget={isOverBudget}
        />

        {/* Pie Chart */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Spending by Category</h2>
          </div>
          <SpendingPieChart data={categoryPieData} />
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="card mb-24">
        <div className="card-header">
          <h2 className="card-title">Monthly Income vs Expenses</h2>
          <Link to="/analytics" className="btn btn-ghost btn-sm">View All <MdArrowForward /></Link>
        </div>
        <MonthlyLineChart data={monthlyData} />
      </div>

      {/* Recent Transactions + News */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Transactions</h2>
            <Link to="/transactions" className="btn btn-ghost btn-sm">View All <MdArrowForward /></Link>
          </div>
          <div className="recent-list">
            {recentTransactions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💳</div>
                <h3>No transactions yet</h3>
                <p>Add your first transaction to get started</p>
              </div>
            ) : recentTransactions.map((t, i) => (
              <TransactionCard
                key={t.id}
                transaction={t}
                index={i}
                onEdit={() => {}}
                onDelete={deleteTransaction}
              />
            ))}
          </div>
        </div>

        {/* Financial News */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Financial News</h2>
            <span className="badge badge-income">Live</span>
          </div>
          <div className="news-list">
            {news.map(item => (
              <div key={item.id} className="news-item">
                <div className="news-category">{item.category}</div>
                <div className="news-title">{item.title}</div>
                <div className="news-meta">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
