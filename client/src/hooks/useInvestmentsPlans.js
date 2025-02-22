// src/hooks/useInvestmentPlans.js
import { useState, useEffect } from "react";
import apiClient from "../utils/api";

const useInvestmentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [errorPlans, setErrorPlans] = useState(null);

  const [actionStatus, setActionStatus] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [errorAction, setErrorAction] = useState(null);

  // Fetch all investment plans
  const fetchInvestmentPlans = async () => {
    setLoadingPlans(true);
    try {
      const response = await apiClient.get("/investments/plans");
      setPlans(response.data);
      setErrorPlans(null);
    } catch (err) {
      setErrorPlans(err.response?.data?.message || "Failed to fetch investment plans");
    } finally {
      setLoadingPlans(false);
    }
  };

  // Create a new investment plan
  const createInvestmentPlan = async (planData) => {
    setLoadingAction(true);
    setErrorAction(null);
    setActionStatus(null);
    try {
      const response = await apiClient.post("/admin/investments/plans", planData);
      setActionStatus(response.data.message);
      await fetchInvestmentPlans(); // Refresh plans after creation
    } catch (err) {
      setErrorAction(err.response?.data?.message || "Failed to create investment plan");
    } finally {
      setLoadingAction(false);
    }
  };

  // Update an existing investment plan
  const updateInvestmentPlan = async (planId, updatedData) => {
    setLoadingAction(true);
    setErrorAction(null);
    setActionStatus(null);
    try {
      const response = await apiClient.put(`/admin/investments/plans/${planId}`, updatedData);
      setActionStatus(response.data.message);
      await fetchInvestmentPlans(); // Refresh plans after update
    } catch (err) {
      setErrorAction(err.response?.data?.message || "Failed to update investment plan");
    } finally {
      setLoadingAction(false);
    }
  };

  // Delete an investment plan
  const deleteInvestmentPlan = async (planId) => {
    setLoadingAction(true);
    setErrorAction(null);
    setActionStatus(null);
    try {
      const response = await apiClient.delete(`/admin/investments/plans/${planId}`);
      setActionStatus(response.data.message);
      await fetchInvestmentPlans(); // Refresh plans after deletion
    } catch (err) {
      setErrorAction(err.response?.data?.message || "Failed to delete investment plan");
    } finally {
      setLoadingAction(false);
    }
  };

  // Fetch investment plans on component mount
  useEffect(() => {
    fetchInvestmentPlans();
  }, []);

  return {
    plans,
    loadingPlans,
    errorPlans,
    createInvestmentPlan,
    updateInvestmentPlan,
    deleteInvestmentPlan,
    loadingAction,
    errorAction,
    actionStatus,
  };
};

export default useInvestmentPlans;
