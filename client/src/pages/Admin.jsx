import { useState, useEffect } from "react";
import useAdminActions from "../hooks/useAdminActions";
import { Sidebar } from "../components/admin/Sidebar";
import UserManagement from "../components/admin/UserManagement";
import InvestmentPlans from "../components/admin/InvestmentPlans";
import WithdrawalManagement from "../components/admin/WithdrawalManagement";
import Announcements from "../components/admin/Announcements";
import { AlertPopup } from "../components/AlertPopup";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const { users, loading, error, fetchUsers, updateUser, deleteUser } =
    useAdminActions();

  const showError = (message) => {
    setAlertType("error");
    setAlertMessage(message);
    setShowAlert(true);
  };

  const showSuccess = (message) => {
    setAlertType("success");
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleUserAction = async (action, userId) => {
    try {
      if (action === "suspend") {
        await updateUser(userId, { status: "suspended" });
        showSuccess("User suspended successfully");
      } else if (action === "delete") {
        await deleteUser(userId);
        showSuccess("User deleted successfully");
      }
    } catch (err) {
      showError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 bg-blue-600 text-white p-2 rounded-md z-50"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        ☰
      </button>

      {/* Sidebar (Mobile & Desktop) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        {/* Sticky Header for Mobile */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-800 p-4 text-white text-center">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeTab === "users" && (
              <UserManagement users={users} onAction={handleUserAction} />
            )}

            {activeTab === "plans" && <InvestmentPlans plans={[]} />}
            {activeTab === "withdrawals" && <WithdrawalManagement />}
            {activeTab === "announcements" && <Announcements announcements={[]} />}
          </>
        )}
      </div>

      {showAlert && (
        <AlertPopup
          type={alertType}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};
