import { User } from '../models/UserModel.js';
import { Deposit } from '../models/Deposit.js';
import tronWeb from '../config/tronWeb.js';

export const confirmDeposit = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.trxWalletAddress) {
      throw new Error('User or wallet address not found');
    }

    // Fetch transactions to the user's wallet address
    const transactions = await tronWeb.trx.getTransactionsToAddress(user.trxWalletAddress);

    let totalDeposit = 0;
    const newDeposits = [];

    for (const tx of transactions) {
      // Skip if transaction is not confirmed
      if (!tx.ret || tx.ret[0].contractRet !== 'SUCCESS') continue;

      // Check if deposit already exists
      const existingDeposit = await Deposit.findOne({ trxHash: tx.txID });
      if (existingDeposit) continue;

      // Record the deposit
      const depositAmount = tronWeb.fromSun(tx.raw_data.contract[0].parameter.value.amount);
      const deposit = new Deposit({
        user: userId,
        amount: depositAmount,
        trxHash: tx.txID,
      });

      await deposit.save();
      newDeposits.push(deposit);
      totalDeposit += depositAmount;
    }

    if (newDeposits.length === 0) {
      throw new Error('No new deposits detected');
    }

    // Update the user's available balance
    user.availableBalance += totalDeposit;
    await user.save();

    return { 
      newBalance: user.availableBalance, 
      newDeposits 
    };
  } catch (err) {
    throw new Error('Error confirming deposit: ' + err.message);
  }
};