// src/pages/ConfirmPurchase.js
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle, Shield, Clock, Zap, AlertCircle, 
  BadgeDollarSign, ArrowLeft 
} from 'lucide-react';
import { AlertPopup } from './AlertPopup.jsx';
import { useEffect, useState } from 'react';
import  useInvestments  from '../hooks/useInvestment.js';

export const ConfirmPurchase = () => {
  const { planType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { plans, loadingPlans, errorPlans, purchaseInvestmentPlan, loadingPurchase, errorPurchase } = useInvestments();

  // Extract the investment amount from the URL query parameters
  const amount = new URLSearchParams(location.search).get('amount');

  // State for alert popup
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  // Decode the plan type from the URL (replace hyphens with spaces)
  const decodedPlanType = planType.replace(/-/g, ' ');

  // Find the selected plan based on the decoded plan type
  const plan = plans.find(p => 
    p.name.toLowerCase() === decodedPlanType.toLowerCase()
  );

  // Redirect to the investments page if the plan is not found
  useEffect(() => {
    if (!plan && !loadingPlans) {
      navigate('/investments');
    }
  }, [plan, loadingPlans, navigate]);

  // Show a loading state while fetching plans
  if (loadingPlans) {
    return <div className="text-white text-center py-4">Loading plan details...</div>;
  }

  // Show an error message if there's an issue fetching plans
  if (errorPlans) {
    return <div className="text-red-500 text-center py-4">Error: {errorPlans}</div>;
  }

  // If the plan is not found, return null (handled by useEffect redirect)
  if (!plan) return null;

  // Handle the confirmation of the purchase
  const handleConfirm = async () => {
    try {
      // Call the purchaseInvestmentPlan function
      await purchaseInvestmentPlan(plan._id, parseFloat(amount));

      setAlertType('success');
      setAlertMessage(
        `Successfully invested ${amount} TRX in ${plan.name} plan! ` +
        `Confirmation ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      );
      setShowAlert(true);

      // Redirect after success
      setTimeout(() => {
        navigate('/investments');
      }, 3000);
    } catch (error) {
      setAlertType('error');
      setAlertMessage(
        `Failed to complete purchase: ${error.message} ` +
        `Please try again or contact support.`
      );
      setShowAlert(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-screen-md mx-auto p-4 md:p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="mr-2" /> Back to Plan
        </button>
        {/* Confirmation Section */}
        <div className="bg-white/5 rounded-xl p-8">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Confirm Investment</h1>
            <p className="text-gray-400">Review your investment details</p>
          </div>
          {/* Investment Details */}
          <div className="bg-white/5 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${plan.color}/20`}>
                  {plan.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                  <p className="text-gray-400">{plan.risk} Risk</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{amount} TRX</p>
                <p className="text-gray-400">Investment</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <div className="text-gray-400">Duration</div>
              <div className="text-white">{plan.duration} weeks</div>
              <div className="text-gray-400">Minimum ROI</div>
              <div className="text-green-400">{plan.roi}%</div>
              <div className="text-gray-400">Fees</div>
              <div className="text-white">
                {plan.type === 'Conservative' ? '0.75%' :
                 plan.type === 'Balanced' ? '1.2%' : '2%'}
              </div>
            </div>
          </div>
          {/* Warning Section */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <p className="text-sm text-red-300">
                This investment carries risk. 
                You could lose some or all of your principal investment.
              </p>
            </div>
          </div>
          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={loadingPurchase}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
          >
            {loadingPurchase ? (
              <>
                <Zap className="w-5 h-5 animate-spin" />
                <span>Purchasing...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Confirm & Invest</span>
              </>
            )}
          </button>
        </div>
      </div>
      {/* Alert Popup */}
      {showAlert && (
        <AlertPopup
          type={alertType}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};