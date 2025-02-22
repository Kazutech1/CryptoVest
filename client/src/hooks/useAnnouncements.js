// src/hooks/useAnnouncements.js
import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const response = await apiClient.get('/admin/announcements');
      setAnnouncements(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  // Fetch announcements on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return { announcements, loading, error };
};

export default useAnnouncements;