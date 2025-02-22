import { useState, useEffect } from "react";
import apiClient from "../utils/api";

const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionStatus, setActionStatus] = useState(null);

  // Fetch all announcements
  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/admin/announcements");
      setAnnouncements(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  // Create a new announcement
  const createAnnouncement = async (announcementData) => {
    setLoadingAction(true);
    setError(null);
    setActionStatus(null);
    try {
      const response = await apiClient.post("/admin/announcements", announcementData);
      setActionStatus(response.data.message);
      await fetchAnnouncements(); // Refresh after creation
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create announcement");
    } finally {
      setLoadingAction(false);
    }
  };

  // Update an announcement
  const updateAnnouncement = async (id, updatedData) => {
    setLoadingAction(true);
    setError(null);
    setActionStatus(null);
    try {
      const response = await apiClient.put(`/admin/announcements/${id}`, updatedData);
      setActionStatus("Announcement updated successfully");
      await fetchAnnouncements(); // Refresh after update
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update announcement");
    } finally {
      setLoadingAction(false);
    }
  };

  // Delete an announcement
  const deleteAnnouncement = async (id) => {
    setLoadingAction(true);
    setError(null);
    setActionStatus(null);
    try {
      await apiClient.delete(`/admin/announcements/${id}`);
      setActionStatus("Announcement deleted successfully");
      await fetchAnnouncements(); // Refresh after deletion
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete announcement");
    } finally {
      setLoadingAction(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    announcements,
    loading,
    error,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    loadingAction,
    actionStatus,
  };
};

export default useAnnouncements;
