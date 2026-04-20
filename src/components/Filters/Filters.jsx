import React from 'react';
import { MdFilterList, MdRefresh } from 'react-icons/md';
import { CATEGORIES } from '../../utils/currencyFormatter';
import './Filters.css';

const ALL_CATS = ['Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Subscriptions', 'Salary', 'Freelance', 'Investment', 'Other'];

const Filters = ({ filters, onFilter, onReset, sortBy, setSortBy, sortOrder, setSortOrder }) => {
  return (
    <div className="filters-bar">
      <div className="filters-row">
        <div className="filter-group">
          <label className="filter-label"><MdFilterList /> Type</label>
          <select className="form-select filter-select" value={filters.type} onChange={e => onFilter('type', e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select className="form-select filter-select" value={filters.category} onChange={e => onFilter('category', e.target.value)}>
            <option value="all">All Categories</option>
            {ALL_CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">From Date</label>
          <input type="date" className="form-input filter-select" value={filters.dateFrom} onChange={e => onFilter('dateFrom', e.target.value)} />
        </div>

        <div className="filter-group">
          <label className="filter-label">To Date</label>
          <input type="date" className="form-input filter-select" value={filters.dateTo} onChange={e => onFilter('dateTo', e.target.value)} />
        </div>

        {sortBy !== undefined && (
          <>
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select className="form-select filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
                <option value="title">Title</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Order</label>
              <select className="form-select filter-select" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </>
        )}

        <button className="btn btn-ghost btn-sm filters-reset" onClick={onReset} title="Reset Filters">
          <MdRefresh /> Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
