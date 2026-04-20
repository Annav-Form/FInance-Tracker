# 💰 FinTrack — Personal Finance & Expense Analytics App

A full-featured personal finance app built with React for tracking income, expenses, budgets, and financial analytics.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ installed
- npm or yarn

### Installation

```bash
# 1. Navigate to the project folder
cd finance-app

# 2. Install all dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at **http://localhost:3000**

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Charts/           # Recharts pie, line, bar charts
│   ├── TransactionCard/  # Individual transaction display
│   ├── SearchBar/        # Search input component
│   ├── Filters/          # Filter & sort controls
│   ├── BudgetCard/       # Budget progress display
│   ├── StatCard.jsx      # Metric summary card
│   └── Sidebar.jsx       # Navigation sidebar
│
├── pages/
│   ├── Dashboard/        # /dashboard — overview + news
│   ├── Transactions/     # /transactions — full list with edit/delete
│   ├── AddTransaction/   # /transactions/new — form page
│   ├── Budget/           # /budget — monthly budget tracker
│   └── Analytics/        # /analytics — charts + currency converter
│
├── context/
│   └── FinanceContext.jsx  # Global state (Context API)
│
├── hooks/
│   ├── useTransactions.js  # CRUD + search/filter/sort logic
│   ├── useBudget.js        # Budget calculations
│   ├── useDebounce.js      # Search optimization
│   └── useCurrency.js      # Currency formatting & conversion
│
├── services/
│   └── api.js              # Exchange rate API + news API
│
└── utils/
    └── currencyFormatter.js  # Format helpers, category constants
```

---

## ✅ Features Implemented

| Feature | Status |
|---|---|
| Add / Edit / Delete Transactions | ✅ |
| Income & Expense categorization | ✅ |
| Search by title / notes | ✅ |
| Filter by category, type, date range | ✅ |
| Sort by date, amount, category | ✅ |
| Monthly budget tracking | ✅ |
| Spending by category (Pie Chart) | ✅ |
| Monthly trend (Line Chart) | ✅ |
| Income vs Expense (Bar Chart) | ✅ |
| Recurring expense tracking | ✅ |
| Currency conversion (Exchange Rate API) | ✅ |
| Financial news feed | ✅ |
| Framer Motion animations | ✅ |
| React Hook Form + Yup validation | ✅ |
| Context API global state | ✅ |
| LocalStorage persistence | ✅ |
| Mobile responsive | ✅ |
| Toast notifications | ✅ |

---

## 📦 Packages Used

| Package | Purpose |
|---|---|
| react-router-dom | Page routing |
| axios | API requests |
| react-icons | Icon library |
| react-toastify | Toast notifications |
| react-hook-form | Form management |
| yup + @hookform/resolvers | Form validation |
| recharts | Charts & graphs |
| date-fns | Date utilities |
| uuid | Unique transaction IDs |
| framer-motion | Animations |

---

## 🎨 Design Decisions

- **Dark theme** with a green accent color system for a modern fintech look
- **Syne** display font (geometric, modern) paired with **DM Sans** body font
- Color-coded transactions: green for income, red for expenses
- Persistent data via **localStorage** — your data survives page refresh
- Sample transactions pre-loaded so the app is immediately usable

---

## 👤 Author

Mid-Term React Project — Personal Finance & Expense Analytics App
