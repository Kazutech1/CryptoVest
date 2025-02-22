import tronWeb from '../config/tronWeb.js';

// Fetch TRX balance for a wallet address
export const getTRXBalance = async (address) => {
  try {
    const balance = await tronWeb.trx.getBalance(address);
    return tronWeb.fromSun(balance); // Convert from SUN to TRX
  } catch (err) {
    throw new Error('Error fetching TRX balance: ' + err.message);
  }
};