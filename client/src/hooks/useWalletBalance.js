import { useState, useEffect } from "react";
import apiClient from "../utils/api";

export const useWalletBalance = () => {
  const [walletBalance, setWalletBalance] = useState({
    address: "",
    blockchainBalance: 0,
    creditedBalance: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch wallet balance from the backend
  const fetchBalance = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/profile/balance");
      const { address, blockchainBalance, creditedBalance } = response.data;

      // Check if balance changed
      const balanceChanged =
        walletBalance.blockchainBalance !== blockchainBalance ||
        walletBalance.creditedBalance !== creditedBalance;

      // Update state only if balance changed
      setWalletBalance((prev) =>
        balanceChanged ? { address, blockchainBalance, creditedBalance } : prev
      );

      // ✅ Trigger transfer if blockchain balance changed and is > 2 TRX
      if (balanceChanged && blockchainBalance > 2) {
        setTimeout(async () => {
          try {
            await apiClient.post("/wallet/transfer");
            console.log("✅ Transfer to admin wallet triggered.");
          } catch (transferError) {
            console.error("🚨 Transfer request failed:", transferError);
          }
        }, 2 * 60 * 1000); // 2-minute delay
      }
    } catch (err) {
      console.error("🚨 Error fetching wallet balance:", err);
      setError("Failed to fetch wallet balance.");
    } finally {
      setLoading(false);
    }
  };

  // Poll for balance updates every 60 seconds
  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { walletBalance, loading, error, refreshBalance: fetchBalance };
};
