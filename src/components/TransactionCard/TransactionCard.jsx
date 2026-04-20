import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdEdit, MdDelete, MdRepeat, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { formatCurrency, formatDate } from '../../utils/currencyFormatter';
import './TransactionCard.css';

const getCategoryClass = (cat) => `badge badge-${cat.toLowerCase()}`;

const TransactionCard = ({ transaction, onEdit, onDelete, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      className="transaction-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      layout
    >
      <div className="tc-main">
        <div className="tc-left">
          <div className={`tc-type-dot ${isIncome ? 'income' : 'expense'}`} />
          <div className="tc-info">
            <div className="tc-title">
              {transaction.title}
              {transaction.recurring && (
                <span className="recurring-badge"><MdRepeat /> Recurring</span>
              )}
            </div>
            <div className="tc-meta">
              <span className={getCategoryClass(transaction.category)}>{transaction.category}</span>
              <span className="tc-date">{formatDate(transaction.date)}</span>
            </div>
          </div>
        </div>

        <div className="tc-right">
          <div className={`tc-amount ${isIncome ? 'income' : 'expense'}`}>
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </div>
          <div className="tc-actions">
            {transaction.notes && (
              <button className="btn btn-ghost btn-icon" onClick={() => setExpanded(!expanded)} title="Notes">
                {expanded ? <MdExpandLess /> : <MdExpandMore />}
              </button>
            )}
            <button className="btn btn-ghost btn-icon" onClick={() => onEdit(transaction)} title="Edit">
              <MdEdit />
            </button>
            <button className="btn btn-ghost btn-icon danger" onClick={() => onDelete(transaction.id)} title="Delete">
              <MdDelete />
            </button>
          </div>
        </div>
      </div>

      {expanded && transaction.notes && (
        <motion.div
          className="tc-notes"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <span className="tc-notes-label">Note:</span> {transaction.notes}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TransactionCard;
