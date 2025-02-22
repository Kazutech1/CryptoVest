import tronWeb from '../config/tronWeb.js';
import { User } from '../models/UserModel.js';
import { Deposit } from '../models/deposit.js';

// Listen for incoming transactions to a user's wallet address
export const startBlockchainListener = async () => {
  try {
    console.log('Starting blockchain listener...');

    // Get all users with a TRX wallet address
    const users = await User.find({ trxWalletAddress: { $ne: '' } });

    // Listen for transactions to each user's wallet address
    users.forEach((user) => {
      const { trxWalletAddress } = user;

      // Subscribe to transactions for the user's wallet address
      tronWeb
        .contract()
        .at(tronWeb.address.toHex(trxWalletAddress))
        .then((contract) => {
          contract.Transfer().watch((err, event) => {
            if (err) {
              console.error('Error listening for transactions:', err);
              return;
            }

            // Handle the incoming transaction
            handleIncomingTransaction(event, user._id);
          });
        })
        .catch((err) => {
          console.error('Error subscribing to wallet address:', err);
        });
    });
  } catch (err) {
    console.error('Error starting blockchain listener:', err);
  }
};

// Handle an incoming transaction
const handleIncomingTransaction = async (event, userId) => {
  try {
    const { transaction, result } = event;
    const { to, value } = result;

    // Convert value from SUN to TRX
    const amount = tronWeb.fromSun(value);

    // Check if the transaction is already recorded
    const existingDeposit = await Deposit.findOne({ trxHash: transaction });
    if (existingDeposit) {
      console.log('Deposit already recorded:', transaction);
      return;
    }

    // Record the deposit
    const deposit = new Deposit({
      user: userId,
      amount,
      trxHash: transaction,
      status: 'confirmed', // Automatically confirm the deposit
    });
    await deposit.save();

    // Update the user's balance
    const user = await User.findById(userId);
    user.availableBalance += amount;
    await user.save();

    console.log('Deposit recorded and balance updated:', deposit);
  } catch (err) {
    console.error('Error handling incoming transaction:', err);
  }
};