import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar
} from 'recharts';
import { CATEGORY_COLORS, formatCurrency, formatMonthYear } from '../../utils/currencyFormatter';
import './Charts.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {label && <div className="chart-tooltip-label">{label}</div>}
      {payload.map((p, i) => (
        <div key={i} className="chart-tooltip-item" style={{ color: p.color }}>
          <span>{p.name}:</span> <strong>{formatCurrency(p.value)}</strong>
        </div>
      ))}
    </div>
  );
};

export const SpendingPieChart = ({ data }) => {
  if (!data?.length) return <div className="empty-state"><div className="empty-state-icon">🥧</div><p>No expense data</p></div>;
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={3}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#8888aa'} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{value}</span>}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const MonthlyLineChart = ({ data }) => {
  if (!data?.length) return <div className="empty-state"><div className="empty-state-icon">📈</div><p>No monthly data</p></div>;
  const formatted = data.map(d => ({ ...d, month: formatMonthYear(d.month) }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={formatted} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={(v) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{v}</span>} />
        <Line type="monotone" dataKey="income" name="Income" stroke="var(--accent-green)" strokeWidth={2.5} dot={{ fill: 'var(--accent-green)', r: 4 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="expense" name="Expense" stroke="var(--accent-red)" strokeWidth={2.5} dot={{ fill: 'var(--accent-red)', r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const IncomeExpenseBarChart = ({ data }) => {
  if (!data?.length) return <div className="empty-state"><div className="empty-state-icon">📊</div><p>No data available</p></div>;
  const formatted = data.map(d => ({ ...d, month: formatMonthYear(d.month) }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={formatted} margin={{ top: 5, right: 20, left: 10, bottom: 5 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={(v) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{v}</span>} />
        <Bar dataKey="income" name="Income" fill="var(--accent-green)" radius={[4,4,0,0]} fillOpacity={0.85} />
        <Bar dataKey="expense" name="Expense" fill="var(--accent-red)" radius={[4,4,0,0]} fillOpacity={0.85} />
      </BarChart>
    </ResponsiveContainer>
  );
};
