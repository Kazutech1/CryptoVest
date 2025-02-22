import { useState } from "react";
import {AdminDashboard} from "./UserDetails"; // Import the details component

const UserManagement = ({ users, onAction }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* If a user is selected, show details instead of the table */}
      {selectedUser ? (
        <div>
          <button
            onClick={() => setSelectedUser(null)}
            className="mb-4 px-3 py-2 bg-gray-700 text-white rounded-lg"
          >
            Back to User List
          </button>
          <AdminDashboard user={selectedUser} />
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">User Management</h2>
            <span className="text-gray-300 text-sm bg-white/10 px-3 py-1 rounded-lg">
              Total Users: {filteredUsers.length}
            </span>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by email..."
              className="w-full bg-gray-800/50 text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Scrollable Table Wrapper */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 overflow-hidden">
            <div className="max-h-[550px] overflow-y-auto overflow-x-auto">
              <table className="w-full min-w-[700px]">
                {/* Sticky Header */}
                <thead className="sticky top-0 backdrop-blur-md shadow-md">
                  <tr>
                    <th className="py-3 text-left text-gray-400">Email</th>
                    <th className="py-3 text-left text-gray-400">Status</th>
                    <th className="py-3 text-left text-gray-400">Balance</th>
                    <th className="py-3 text-left text-gray-400">IP Address</th>
                    <th className="py-3 text-right text-gray-400">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-white/10 last:border-none cursor-pointer hover:bg-gray-700/20"
                        onClick={() => setSelectedUser(user)} // Set selected user on click
                      >
                        <td className="py-3 text-white">{user.email}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : user.status === "suspended"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 text-white">${user.balance}</td>
                        <td className="py-3 text-white">{user.ipAddress}</td>
                        <td className="py-3 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click from triggering
                                onAction("suspend", user._id);
                              }}
                              className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500/30 transition"
                            >
                              Suspend
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click from triggering
                                onAction("delete", user._id);
                              }}
                              className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500/30 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-3 text-center text-gray-400">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
