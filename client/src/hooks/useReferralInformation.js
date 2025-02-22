// src/hooks/useReferralInformation.js
import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

const useReferralInformation = () => {
  const [referralInfo, setReferralInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReferralInformation = async () => {
    try {
      const response = await apiClient.get('/referrals');
      setReferralInfo(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch referral information');
    } finally {
      setLoading(false);
    }
  };

  // Fetch referral information on component mount
  useEffect(() => {
    fetchReferralInformation();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return { referralInfo, loading, error };
};

export default useReferralInformation;