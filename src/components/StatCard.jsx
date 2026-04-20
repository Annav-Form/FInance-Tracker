import React from 'react';
import { motion } from 'framer-motion';
import './StatCard.css';

const StatCard = ({ label, value, icon, color = 'green', subtitle, index = 0 }) => {
  const colorMap = {
    green: { bg: 'var(--accent-green-dim)', text: 'var(--accent-green)', border: 'rgba(0,229,160,0.2)' },
    red:   { bg: 'var(--accent-red-dim)',   text: 'var(--accent-red)',   border: 'rgba(255,77,109,0.2)' },
    blue:  { bg: 'var(--accent-blue-dim)',  text: 'var(--accent-blue)',  border: 'rgba(77,121,255,0.2)' },
    amber: { bg: 'var(--accent-amber-dim)', text: 'var(--accent-amber)', border: 'rgba(255,184,48,0.2)' },
    purple:{ bg: 'var(--accent-purple-dim)',text: 'var(--accent-purple)',border: 'rgba(181,123,238,0.2)' },
  };
  const c = colorMap[color] || colorMap.green;

  return (
    <motion.div
      className="stat-card card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <div className="stat-top">
        <div className="stat-label">{label}</div>
        <div className="stat-icon" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
          {icon}
        </div>
      </div>
      <div className="stat-value" style={{ color: c.text }}>{value}</div>
      {subtitle && <div className="stat-subtitle">{subtitle}</div>}
    </motion.div>
  );
};

export default StatCard;
