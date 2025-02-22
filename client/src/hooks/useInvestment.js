// src/hooks/useInvestments.js
import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

const useInvestments = () => {
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [errorPlans, setErrorPlans] = useState(null);

  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const [errorPurchase, setErrorPurchase] = useState(null);

  // Function to fetch investment plans
  const fetchInvestmentPlans = async () => {
    try {
      const response = await apiClient.get('/investments/plans');
      setPlans(response.data);
      setErrorPlans(null);
    } catch (err) {
      setErrorPlans(err.response?.data?.message || 'Failed to fetch investment plans');
    } finally {
      setLoadingPlans(false);
    }
  };

  // Function to purchase an investment plan
  const purchaseInvestmentPlan = async (planId, amount) => {
    setLoadingPurchase(true);
    setErrorPurchase(null);
    setPurchaseStatus(null);
    try {
      const response = await apiClient.post('/investments/purchase', { planId, amount });
      setPurchaseStatus(response.data.message);
      setErrorPurchase(null);
    } catch (err) {
      setErrorPurchase(err.response?.data?.message || 'Failed to purchase investment plan');
    } finally {
      setLoadingPurchase(false);
      fetchInvestmentPlans(); // Refresh plans after purchase
    }
  };

  // Fetch investment plans on component mount
  useEffect(() => {
    fetchInvestmentPlans();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return {
    plans,
    loadingPlans,
    errorPlans,
    purchaseInvestmentPlan,
    loadingPurchase,
    errorPurchase,
    purchaseStatus,
  };
};

export default useInvestments;