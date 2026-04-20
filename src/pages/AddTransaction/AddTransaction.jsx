import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdArrowBack } from 'react-icons/md';
import { useFinance } from '../../context/FinanceContext';
import TransactionForm from './TransactionForm';
import './AddTransaction.css';

const AddTransaction = () => {
  const navigate = useNavigate();
  const { addTransaction } = useFinance();

  const handleSubmit = (data) => {
    addTransaction(data);
    navigate('/transactions');
  };

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <button className="btn btn-ghost mb-16" onClick={() => navigate(-1)}>
          <MdArrowBack /> Back
        </button>
        <div className="page-header">
          <div>
            <h1 className="page-title">Add Transaction</h1>
            <p className="page-subtitle">Record a new income or expense</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="add-transaction-layout"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="card add-transaction-card">
          <TransactionForm onSubmit={handleSubmit} />
        </div>

        <div className="add-transaction-tips card">
          <h3 className="tips-title">💡 Tips</h3>
          <ul className="tips-list">
            <li>Mark subscriptions as <strong>recurring</strong> to track them easily.</li>
            <li>Use clear titles like <em>"Zomato – Dinner"</em> instead of just <em>"Food"</em>.</li>
            <li>Add notes to remember the context of each transaction.</li>
            <li>Log transactions promptly so you don't forget them.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default AddTransaction;
