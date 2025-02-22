import express from 'express';
import { 
  getUsers, updateUser, deleteUser, 
  getInvestmentPlansAdmin, createInvestmentPlan, updateInvestmentPlan, deleteInvestmentPlan, 
  getTransactions, adjustBalance, 
  getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement, 
  getAllWithdrawalRequests, approveWithdrawalRequest, rejectWithdrawalRequest, 
  isAdmin
} from '../controllers/adminController.mjs';

const router = express.Router();

// Middleware to check if the user is an admin
// const isAdmin = (req, res, next) => {
//   if (req.userId !== 'admin_user_id_here') { // Replace with actual admin check logic
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   next();
// };
 
// User Management
router.get('/users', isAdmin, getUsers);
router.put('/users/:id', isAdmin, updateUser);
router.delete('/users/:id', isAdmin, deleteUser);

// Investment Plan Management
router.get('/investment-plans', isAdmin, getInvestmentPlansAdmin);
router.post('/investment-plans', isAdmin, createInvestmentPlan);
router.put('/investment-plans/:id', isAdmin, updateInvestmentPlan);
router.delete('/investment-plans/:id', isAdmin, deleteInvestmentPlan);

// Transaction Management
router.get('/transactions', isAdmin, getTransactions);

// Balance Adjustment
router.put('/users/:id/balance', isAdmin, adjustBalance);

// Announcement Management
router.get('/announcements',  getAnnouncements);
router.post('/announcements', isAdmin, createAnnouncement);
router.put('/announcements/:id', isAdmin, updateAnnouncement);
router.delete('/announcements/:id', isAdmin, deleteAnnouncement);

// Withdrawal Request Management
router.get('/withdrawal/requests', isAdmin, getAllWithdrawalRequests);
router.put('/withdrawal/requests/:requestId/approve', isAdmin, approveWithdrawalRequest);
router.put('/withdrawal/requests/:requestId/reject', isAdmin, rejectWithdrawalRequest);

export default router;