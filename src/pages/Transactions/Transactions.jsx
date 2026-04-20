import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdClose } from 'react-icons/md';
import { useTransactions } from '../../hooks/useTransactions';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import TransactionForm from '../AddTransaction/TransactionForm';
import './Transactions.css';

const Transactions = () => {
  const {
    transactions, allTransactions,
    search, setSearch,
    filters, updateFilter, resetFilters,
    sortBy, setSortBy, sortOrder, setSortOrder,
    deleteTransaction, updateTransaction,
  } = useTransactions();

  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (t) => setEditingTransaction(t);
  const handleEditSave = (data) => { updateTransaction(editingTransaction.id, data); setEditingTransaction(null); };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">{allTransactions.length} total · {transactions.length} shown</p>
        </div>
        <Link to="/transactions/new" className="btn btn-primary"><MdAdd /> Add New</Link>
      </div>

      {/* Search */}
      <div className="transactions-search mb-16">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by title or notes..." />
      </div>

      {/* Filters */}
      <Filters
        filters={filters}
        onFilter={updateFilter}
        onReset={resetFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* List */}
      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-state-icon">🔍</div>
            <h3>No transactions found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn btn-secondary mt-16" onClick={resetFilters}>
              <MdClose /> Clear Filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {transactions.map((t, i) => (
              <TransactionCard
                key={t.id}
                transaction={t}
                index={i}
                onEdit={handleEdit}
                onDelete={deleteTransaction}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingTransaction && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setEditingTransaction(null)}>
            <motion.div className="modal-panel" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
              <div className="modal-header">
                <h2 className="modal-title">Edit Transaction</h2>
                <button className="btn btn-ghost btn-icon" onClick={() => setEditingTransaction(null)}><MdClose /></button>
              </div>
              <TransactionForm defaultValues={editingTransaction} onSubmit={handleEditSave} submitLabel="Save Changes" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Transactions;
