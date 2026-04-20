import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { format } from 'date-fns';
import { CATEGORIES } from '../../utils/currencyFormatter';
import './AddTransaction.css';

const schema = yup.object({
  title: yup.string().required('Title is required').min(2, 'Too short').max(80, 'Too long'),
  amount: yup.number().typeError('Enter a valid amount').positive('Must be positive').required('Amount is required'),
  category: yup.string().required('Category is required'),
  type: yup.string().oneOf(['income', 'expense']).required('Type is required'),
  date: yup.string().required('Date is required'),
  notes: yup.string().max(200, 'Max 200 characters').optional(),
  recurring: yup.boolean(),
});

const TransactionForm = ({ defaultValues, onSubmit, submitLabel = 'Add Transaction' }) => {
  const isIncome = defaultValues?.type === 'income';
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'expense',
      date: todayStr,
      recurring: false,
      ...defaultValues,
      date: defaultValues?.date ? format(new Date(defaultValues.date), 'yyyy-MM-dd') : todayStr,
      amount: defaultValues?.amount || '',
    },
  });

  const selectedType = watch('type');
  const cats = CATEGORIES[selectedType] || CATEGORIES.expense;

  return (
    <form className="transaction-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Type Toggle */}
      <div className="form-group">
        <label className="form-label">Transaction Type</label>
        <div className="type-toggle">
          <label className={`type-option expense ${selectedType === 'expense' ? 'active' : ''}`}>
            <input type="radio" value="expense" {...register('type')} hidden />
            <span>💸 Expense</span>
          </label>
          <label className={`type-option income ${selectedType === 'income' ? 'active' : ''}`}>
            <input type="radio" value="income" {...register('type')} hidden />
            <span>💰 Income</span>
          </label>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input className="form-input" placeholder="e.g. Zomato Order" {...register('title')} />
          {errors.title && <span className="form-error">{errors.title.message}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Amount (₹) *</label>
          <input className="form-input" type="number" step="0.01" placeholder="0.00" {...register('amount')} />
          {errors.amount && <span className="form-error">{errors.amount.message}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select className="form-select" {...register('category')}>
            <option value="">Select category</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <span className="form-error">{errors.category.message}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Date *</label>
          <input className="form-input" type="date" {...register('date')} />
          {errors.date && <span className="form-error">{errors.date.message}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Notes (optional)</label>
        <textarea className="form-textarea" placeholder="Any additional details..." {...register('notes')} />
        {errors.notes && <span className="form-error">{errors.notes.message}</span>}
      </div>

      <div className="form-group">
        <label className="recurring-check">
          <input type="checkbox" {...register('recurring')} />
          <span className="check-custom" />
          <span>Mark as recurring (subscription/monthly)</span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
};

export default TransactionForm;
