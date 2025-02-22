import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/LandingPage';
import { SignupPage } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { ProfilePage } from './pages/Profile';
import { LoginPage } from './pages/Login';
import { Transactions } from './components/Transactions';
import { WithdrawCrypto } from './components/WithdrawCrypto';
import { WalletSettings } from './pages/Settings';
import { AirdropPlans } from './pages/Airdrop';
import { InvestmentPlans } from './pages/Plans';
import { PlanDetails } from './components/PlanDetails';
import { ConfirmPurchase } from './components/Confirmation';
import { AdminDashboard } from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute'; 
import AdminRoute from './components/AdminRoute'; // Import AdminRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes for Authenticated Users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/withdrawal" element={<WithdrawCrypto />} />
          <Route path="/settings" element={<WalletSettings />} />
          <Route path="/airdrop" element={<AirdropPlans />} />
          <Route path="/investments" element={<InvestmentPlans />} />
          <Route path="/plans/:planType" element={<PlanDetails />} />
          <Route path="/plans/confirm/:planType" element={<ConfirmPurchase />} />
        </Route>

        {/* Protected Routes for Admins */}
        <Route element={<AdminRoute />}>
          <Route path="/admins" element={<AdminDashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
