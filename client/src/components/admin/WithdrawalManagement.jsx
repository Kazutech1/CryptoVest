// import useWithdrawalRequests from "../../hooks/useWithdrawalRequests";

import useWithdrawalRequests from "../../hooks/useWithdrawalRequest";

const WithdrawalManagement = () => {
  const {
    requests: withdrawals,
    loading,
    error,
    approveWithdrawalRequest,
    rejectWithdrawalRequest,
    loadingAction,
    actionStatus,
  } = useWithdrawalRequests();

  const handleAction = async (action, requestId) => {
    if (action === "approve") {
      await approveWithdrawalRequest(requestId);
    } else if (action === "reject") {
      await rejectWithdrawalRequest(requestId);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Withdrawal Requests</h2>

      {error && <p className="text-red-500">{error}</p>}
      {actionStatus && <p className="text-green-500">{actionStatus}</p>}

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        {loading ? (
          <p className="text-white text-center">Loading withdrawal requests...</p>
        ) : withdrawals.length === 0 ? (
          <p className="text-white text-center">No withdrawal requests available.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 text-left text-gray-400">User</th>
                <th className="py-3 text-left text-gray-400">Amount</th>
                <th className="py-3 text-left text-gray-400">Status</th>
                <th className="py-3 text-right text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal._id} className="border-b border-white/10 last:border-0">
                 <td className="py-3 text-white">{withdrawal.userId?.username || "Unknown User"}</td>

                  <td className="py-3 text-white">${withdrawal.amount}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        withdrawal.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : withdrawal.status === "approved"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {withdrawal.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end space-x-2">
                      {withdrawal.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleAction("approve", withdrawal._id)}
                            className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg hover:bg-green-500/30"
                            disabled={loadingAction}
                          >
                            {loadingAction ? "Processing..." : "Approve"}
                          </button>
                          <button
                            onClick={() => handleAction("reject", withdrawal._id)}
                            className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500/30"
                            disabled={loadingAction}
                          >
                            {loadingAction ? "Processing..." : "Reject"}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WithdrawalManagement;
