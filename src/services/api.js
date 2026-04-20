import axios from 'axios';

const EXCHANGE_API = 'https://api.exchangerate-api.com/v4/latest/INR';

export const fetchExchangeRates = async () => {
  try {
    const { data } = await axios.get(EXCHANGE_API);
    return data.rates;
  } catch (err) {
    console.error('Exchange rate fetch failed:', err);
    // Fallback approximate rates relative to INR
    return { USD: 0.012, EUR: 0.011, GBP: 0.0094, JPY: 1.78, INR: 1 };
  }
};

export const fetchFinancialNews = async () => {
  // Returns mock news since NewsAPI requires a key
  return [
    { id: 1, title: 'RBI Keeps Repo Rate Unchanged at 6.5%', source: 'Economic Times', date: '2024-02-08', url: '#', category: 'Monetary Policy' },
    { id: 2, title: 'Sensex Hits New Record High of 75,000', source: 'Mint', date: '2024-02-07', url: '#', category: 'Markets' },
    { id: 3, title: 'Budget 2024: Tax Rebate Limit Raised to ₹7 Lakh', source: 'NDTV Profit', date: '2024-02-06', url: '#', category: 'Taxation' },
    { id: 4, title: 'UPI Transactions Cross ₹18 Lakh Crore in January', source: 'Business Standard', date: '2024-02-05', url: '#', category: 'Fintech' },
    { id: 5, title: 'How to Build an Emergency Fund in 2024', source: 'Moneycontrol', date: '2024-02-04', url: '#', category: 'Personal Finance' },
  ];
};
