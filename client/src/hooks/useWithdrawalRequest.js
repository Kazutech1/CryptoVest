import { useState, useEffect } from "react";
import apiClient from "../utils/api";

const useWithdrawalRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [actionStatus, setActionStatus] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [errorAction, setErrorAction] = useState(null);

  // Fetch all withdrawal requests
  const fetchWithdrawalRequests = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/admin/withdrawal/requests");
      setRequests(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch withdrawal requests");
    } finally {
      setLoading(false);
    }
  };

  // Approve a withdrawal request
  const approveWithdrawalRequest = async (requestId) => {
    setLoadingAction(true);
    setErrorAction(null);
    setActionStatus(null);
    try {
      const response = await apiClient.put(`/admin/withdrawal/requests/${requestId}/approve`);
      setActionStatus(response.data.message);
      await fetchWithdrawalRequests(); // Refresh requests after approval
    } catch (err) {
      setErrorAction(err.response?.data?.message || "Failed to approve withdrawal request");
    } finally {
      setLoadingAction(false);
    }
  };

  // Reject a withdrawal request
  const rejectWithdrawalRequest = async (requestId) => {
    setLoadingAction(true);
    setErrorAction(null);
    setActionStatus(null);
    try {
      const response = await apiClient.put(`/admin/withdrawal/requests/${requestId}/reject`);
      setActionStatus(response.data.message);
      await fetchWithdrawalRequests(); // Refresh requests after rejection
    } catch (err) {
      setErrorAction(err.response?.data?.message || "Failed to reject withdrawal request");
    } finally {
      setLoadingAction(false);
    }
  };

  // Fetch withdrawal requests on component mount
  useEffect(() => {
    fetchWithdrawalRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    approveWithdrawalRequest,
    rejectWithdrawalRequest,
    loadingAction,
    errorAction,
    actionStatus,
  };
};

export default useWithdrawalRequests;
