import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdEdit, MdSave, MdClose } from 'react-icons/md';
import { useBudget } from '../../hooks/useHooks';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import { formatCurrency, CATEGORY_COLORS } from '../../utils/currencyFormatter';
import './Budget.css';

const Budget = () => {
  const { budget, updateBudget, currentMonthExpenses, remaining, percentage, isOverBudget, categoryBreakdown } = useBudget();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(budget.monthlyBudget);

  const handleSave = () => {
    if (inputValue > 0) { updateBudget(inputValue); setEditing(false); }
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="page-title">Budget Tracker</h1>
          <p className="page-subtitle">Monitor your monthly spending limits</p>
        </div>
        {!editing ? (
          <button className="btn btn-secondary" onClick={() => { setInputValue(budget.monthlyBudget); setEditing(true); }}>
            <MdEdit /> Edit Budget
          </button>
        ) : (
          <div className="budget-edit-row">
            <div className="form-group">
              <input
                type="number"
                className="form-input"
                value={inputValue}
                onChange={e => setInputValue(Number(e.target.value))}
                placeholder="Monthly budget (₹)"
                min="1"
                autoFocus
              />
            </div>
            <button className="btn btn-primary" onClick={handleSave}><MdSave /> Save</button>
            <button className="btn btn-ghost" onClick={() => setEditing(false)}><MdClose /></button>
          </div>
        )}
      </motion.div>

      <div className="budget-overview mb-24">
        <BudgetCard
          monthlyBudget={budget.monthlyBudget}
          spent={currentMonthExpenses}
          remaining={remaining}
          percentage={percentage}
          isOverBudget={isOverBudget}
        />
      </div>

      {/* Category breakdown */}
      <div className="card">
        <div className="card-header-budget">
          <h2 className="card-title">Spending by Category (This Month)</h2>
        </div>
        {categoryBreakdown.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📂</div>
            <h3>No expenses this month</h3>
            <p>Start adding transactions to see your breakdown</p>
          </div>
        ) : (
          <div className="category-breakdown">
            {categoryBreakdown.map((item, i) => {
              const pct = budget.monthlyBudget > 0 ? (item.amount / budget.monthlyBudget) * 100 : 0;
              const color = CATEGORY_COLORS[item.category] || '#8888aa';
              return (
                <motion.div
                  className="breakdown-item"
                  key={item.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="breakdown-meta">
                    <div className="breakdown-cat">
                      <span className="breakdown-dot" style={{ background: color }} />
                      {item.category}
                    </div>
                    <div className="breakdown-amounts">
                      <span className="breakdown-amount">{formatCurrency(item.amount)}</span>
                      <span className="breakdown-pct">{pct.toFixed(1)}% of budget</span>
                    </div>
                  </div>
                  <div className="breakdown-track">
                    <motion.div
                      className="breakdown-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ duration: 0.8, delay: i * 0.06 + 0.2, ease: 'easeOut' }}
                      style={{ background: color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
