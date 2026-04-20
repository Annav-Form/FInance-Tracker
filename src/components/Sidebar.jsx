import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdDashboard, MdReceipt, MdAddCircle, MdAccountBalance,
  MdBarChart, MdMenu, MdClose, MdAttachMoney
} from 'react-icons/md';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/currencyFormatter';
import './Sidebar.css';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: MdDashboard },
  { path: '/transactions', label: 'Transactions', icon: MdReceipt },
  { path: '/transactions/new', label: 'Add Transaction', icon: MdAddCircle, accent: true },
  { path: '/budget', label: 'Budget', icon: MdAccountBalance },
  { path: '/analytics', label: 'Analytics', icon: MdBarChart },
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { getAnalytics } = useFinance();
  const { netBalance } = getAnalytics();

  const SidebarContent = () => (
    <div className="sidebar-inner">
      <div className="sidebar-logo">
        <div className="logo-icon"><MdAttachMoney /></div>
        <div>
          <div className="logo-title">FinTrack</div>
          <div className="logo-subtitle">Personal Finance</div>
        </div>
      </div>

      <div className="sidebar-balance-card">
        <div className="balance-label">Net Balance</div>
        <div className={`balance-amount ${netBalance >= 0 ? 'positive' : 'negative'}`}>
          {formatCurrency(Math.abs(netBalance))}
        </div>
        <div className="balance-status">{netBalance >= 0 ? '↑ Healthy' : '↓ Deficit'}</div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ path, label, icon: Icon, accent }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''} ${accent ? 'accent' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <Icon className="nav-icon" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-text">Personal Finance App</div>
        <div className="sidebar-footer-sub">React Project © 2024</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar desktop-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
        <MdMenu />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="sidebar mobile-sidebar"
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <button className="mobile-close-btn" onClick={() => setMobileOpen(false)}><MdClose /></button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
