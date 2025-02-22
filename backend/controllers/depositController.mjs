import User, { decrypt } from '../models/User.mjs';
import Transaction from '../models/Transaction.mjs';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import {TronWeb} from 'tronweb';




// Simulate Deposit
export const simulateDeposit = async (req, res) => {
  try {
    const userId = req.userId; // Get user ID from JWT middleware
    const { amount } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update user balance
    user.balance += amount;

    // Create deposit transaction record
    const transaction = new Transaction({
      transactionId: uuidv4(),
      userId,
      type: 'deposit',
      amount,
      currency: 'TRX',
      status: 'completed'
    });

    // Handle referral bonus
    if (user.referredBy) {
      const referrer = await User.findById(user.referredBy);
      if (referrer) {
        const referralBonus = amount * 0.15; // ✅ Corrected: 15% of deposited amount
        referrer.balance += referralBonus;
        user.referralBonus == referralBonus

        const referralTransaction = new Transaction({
          transactionId: uuidv4(),
          userId: referrer._id, // Referrer gets the bonus
          type: 'referral_bonus',
          amount: referralBonus,
          currency: 'TRX',
          status: 'completed',
        });

        // Save referrer updates
        await Promise.all([referrer.save(), referralTransaction.save()]);
      }
    }

    // Save user and transaction
    await Promise.all([user.save(), transaction.save()]);

    res.json({ message: 'Deposit successful', balance: user.balance });
  } catch (error) {
    console.error('🚨 Deposit Error:', error);
    res.status(500).json({ message: error.message });
  }
};



// import User from '../models/User.mjs';

// TronWeb Configuration (Use Mainnet or Testnet API)
const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });

/**
 * Get User's TRX Wallet Balance
 */


export const getWalletBalance = async (req, res) => {
  try {
    const userId = req.userId; // Extract userId from JWT (Assuming Middleware)

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if user has a TRX wallet address
    if (!user.wallet || !user.wallet.trxAddress) {
      return res.status(400).json({ message: 'User does not have a TRX wallet' });
    }

    const trxAddress = user.wallet.trxAddress; // User's TRX address

    // Fetch TRX balance from blockchain
    const balanceInSun = await tronWeb.trx.getBalance(trxAddress);
    const trxBalance = balanceInSun / 1_000_000; // Convert SUN to TRX

    let balanceChanged = false;

    // **Update blockchain balance only if changed**
    if (user.blockchainBalance !== trxBalance) {
      user.blockchainBalance = trxBalance;
      balanceChanged = true;
    }

    // **Update credited balance only if it's different**
    if (user.balance !== user.blockchainBalance && user.blockchainBalance > 2) {
      user.balance = user.blockchainBalance;
      balanceChanged = true;
    }

    const transactions = [];

    // ✅ **Only create a deposit transaction if balance changed**
    if (balanceChanged && user.blockchainBalance > 2) {
      const depositTransaction = new Transaction({
        transactionId: uuidv4(),
        userId,
        type: 'deposit',
        amount: trxBalance,
        currency: 'TRX',
        status: 'completed',
      });

      transactions.push(depositTransaction);

      // **Check for Referrer and Credit them**
      if (user.referrer) {
        const referrer = await User.findById(user.referrer);
        if (referrer) {
          const referralBonus = user.balance * 0.15; // 15% of deposit

          referrer.balance += referralBonus;

          const referralTransaction = new Transaction({
            transactionId: uuidv4(),
            userId: referrer._id, // Referrer gets the bonus
            type: 'referral_bonus',
            amount: referralBonus,
            currency: 'TRX',
            status: 'completed',
          });

          transactions.push(referralTransaction);
          await referrer.save();
        }
      }

      // ✅ **Save both user and transactions in parallel**
      await Promise.all([user.save(), Transaction.insertMany(transactions)]);
    }

    res.json({
      address: trxAddress,
      blockchainBalance: trxBalance, // Real balance from TRX blockchain
      creditedBalance: user.balance, // User sees this balance
    });

    // ✅ **Trigger transfer after 2 minutes if blockchain balance changes**
    if (balanceChanged && user.blockchainBalance > 2) {
      await transferToAdminWallet(user);
    }

  } catch (error) {
    console.error('🚨 Error fetching TRX balance:', error);
    res.status(500).json({ message: 'Failed to fetch wallet balance' });
  }
};



// import TronWeb from 'tronweb';



// 🔹 TRON Admin Wallet (Receiver)
const DESTINATION_WALLET = process.env.DESTINATION_WALLET
; // Your admin TRX wallet

// 🔹 TRON API (Mainnet)
// const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });

/**
 * Transfer user's TRX to admin wallet
 */
const transferToAdminWallet = async (user) => {
  try {
    const updatedUser = await User.findById(user._id).select('+wallet.privateKey');

    if (!updatedUser || !updatedUser.wallet) {
      console.error(`User ${user._id} has no valid TRX wallet.`);
      return;
    }

    // Get user's TRX balance from blockchain
    const balanceInSun = await tronWeb.trx.getBalance(updatedUser.wallet.trxAddress);
    console.log(`🔹 User Balance in SUN: ${balanceInSun}`);

    if (balanceInSun === 0) {
      console.log(`User ${user._id} has 0 TRX, skipping transfer.`);
      return;
    }

    // Decrypt private key
    const userPrivateKey = decrypt(updatedUser.wallet.privateKey);
    console.log("🔹 Decrypted Private Key:", userPrivateKey);

    if (!userPrivateKey) {
      console.error("❌ Decryption failed, private key is null or invalid.");
      return;
    }

    // Verify private key matches wallet address
    const derivedAddress = tronWeb.address.fromPrivateKey(userPrivateKey);
    console.log(`🔹 Derived Address: ${derivedAddress}`);
    console.log(`🔹 User's Wallet Address: ${updatedUser.wallet.trxAddress}`);

    if (derivedAddress !== updatedUser.wallet.trxAddress) {
      console.error("❌ Private key does not match TRX wallet address.");
      return;
    }

    console.log(`✅ Verified private key belongs to ${updatedUser.wallet.trxAddress}`);

    // Initialize TronWeb with user's private key
    const userTronWeb = new TronWeb({
      fullHost: "https://api.trongrid.io",
      privateKey: userPrivateKey,
    });

    // Get the user's available bandwidth
    const bandwidth = await userTronWeb.trx.getBandwidth(updatedUser.wallet.trxAddress);
    console.log(`🔹 Available Bandwidth: ${bandwidth}`);

    // Estimate transaction size (typically around 250 bytes)
    const txSizeBytes = 250;
    const estimatedFeeSun = (txSizeBytes - bandwidth > 0) ? (txSizeBytes - bandwidth) * 1000 : 0; // 1 TRX = 1,000,000 SUN

    // Fetch transaction count from blockchain
    const getUserTransactionCount = async (walletAddress) => {
      try {
        const response = await fetch(`https://api.trongrid.io/v1/accounts/${walletAddress}/transactions?limit=1`);
        const data = await response.json();
        return data?.data?.length || 0;
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        return 0;
      }
    };

    const isFirstTransaction = await getUserTransactionCount(updatedUser.wallet.trxAddress) === 0;
    const fixedFeeSun = isFirstTransaction ? 1.5 * 1_000_000 : estimatedFeeSun + (0.5 * 1_000_000);
    console.log(`🔹 Transaction Fee: ${fixedFeeSun / 1_000_000} TRX`);

    // Ensure the user has enough to cover the fee
    const minTransfer = 200_000; // Minimum 0.2 TRX
    if (balanceInSun <= fixedFeeSun + minTransfer) {
      console.error(`❌ Not enough TRX for transaction. Balance: ${balanceInSun / 1_000_000} TRX`);
      return;
    }

    // Calculate the amount to send
    const amountToSend = balanceInSun - fixedFeeSun;
    console.log(`🔹 Adjusted Amount to Send: ${amountToSend / 1_000_000} TRX`);

    // Create the transaction
    const transactionObject = await userTronWeb.transactionBuilder.sendTrx(
      DESTINATION_WALLET,
      amountToSend,
      updatedUser.wallet.trxAddress
    );

    console.log("🔹 Transaction Object:", transactionObject);

    // Sign and send the transaction
    const signedTransaction = await userTronWeb.trx.sign(transactionObject);
    console.log("🔹 Signed Transaction:", signedTransaction);

    const broadcast = await userTronWeb.trx.sendRawTransaction(signedTransaction);
    console.log("🔹 Transaction Broadcast Response:", broadcast);

    if (broadcast.result) {
      console.log(`✅ ${amountToSend / 1_000_000} TRX transferred from ${updatedUser.wallet.trxAddress} to ${DESTINATION_WALLET}`);

      // Reset blockchain balance in database (since funds are moved)
      updatedUser.blockchainBalance = 0;

    
    } else {
      console.error("🚨 Transaction failed:", broadcast);
    }
  } catch (error) {
    console.error("Error transferring TRX:", error);
  }
};
