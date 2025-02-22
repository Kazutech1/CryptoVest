import tronWeb from '../config/tronWeb.js';

// Generate a new TRX wallet address
export const generateWallet = async () => {
  try {
    const account = await tronWeb.createAccount();
    return {
      address: account.address.base58,
      privateKey: account.privateKey,
    };
  } catch (err) {
    throw new Error('Error generating wallet: ' + err.message);
  }
};