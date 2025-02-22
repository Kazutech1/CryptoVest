// src/hooks/useSummaryData.js
import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

const useSummaryData = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummaryData = async () => {
    try {
      const response = await apiClient.get('/dashboard');
      const { user, investmentSummary, announcements, plans } = response.data;

      // Prepare summary data for SummaryCard components
      const formatNumber = (num) => {
        return Number(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      };
      
      const data = [
        {
          title: 'Total Investment',
          value: `${formatNumber(investmentSummary.totalInvestment)} TRX`,
          change: '',
          icon: 'PieChart',
          color: 'blue',
        },
        {
          title: 'Daily Profit',
          value: `${formatNumber(user.investments.reduce((sum, inv) => sum + (inv.dailyProfit || 0), 0))} TRX`,
          change: '',
          icon: 'BitcoinIcon',
          color: 'green',
        }, 
        {
          title: 'Balance',
          value: `${formatNumber(user.profitBalance)} TRX`,
          change: '',
          icon: 'DollarSign', 
          color: 'yellow',
        },
        {
          title: 'Active Investments',
          value: user.investments.map(inv => inv.planId?.name || 'Unknown').join(', '),
          change: '',
          icon: 'TrendingUp',
          color: 'purple',
        }        
      ];
      

      setSummaryData(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch summary data on component mount
  useEffect(() => {
    fetchSummaryData();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return { summaryData, isLoading, error };
};

export default useSummaryData;