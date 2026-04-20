import React from 'react';
import { motion } from 'framer-motion';
import { MdWarning, MdCheckCircle } from 'react-icons/md';
import { formatCurrency } from '../../utils/currencyFormatter';
import './BudgetCard.css';

const BudgetCard = ({ monthlyBudget, spent, remaining, percentage, isOverBudget }) => {
  const barColor = percentage > 90 ? 'var(--accent-red)' : percentage > 70 ? 'var(--accent-amber)' : 'var(--accent-green)';

  return (
    <div className="budget-card card">
      <div className="budget-header">
        <div>
          <div className="budget-label">Monthly Budget</div>
          <div className="budget-amount">{formatCurrency(monthlyBudget)}</div>
        </div>
        <div className={`budget-status-icon ${isOverBudget ? 'over' : 'ok'}`}>
          {isOverBudget ? <MdWarning /> : <MdCheckCircle />}
        </div>
      </div>

      <div className="budget-progress-track">
        <motion.div
          className="budget-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ background: barColor }}
        />
      </div>

      <div className="budget-stats">
        <div className="budget-stat">
          <div className="budget-stat-label">Spent</div>
          <div className="budget-stat-value" style={{ color: 'var(--accent-red)' }}>{formatCurrency(spent)}</div>
        </div>
        <div className="budget-stat center">
          <div className="budget-stat-label">Used</div>
          <div className="budget-stat-value" style={{ color: barColor }}>{percentage.toFixed(1)}%</div>
        </div>
        <div className="budget-stat right">
          <div className="budget-stat-label">Remaining</div>
          <div className="budget-stat-value" style={{ color: remaining >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {remaining >= 0 ? formatCurrency(remaining) : `-${formatCurrency(Math.abs(remaining))}`}
          </div>
        </div>
      </div>

      {isOverBudget && (
        <div className="budget-warning">
          <MdWarning /> You've exceeded your budget by {formatCurrency(Math.abs(remaining))}
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
