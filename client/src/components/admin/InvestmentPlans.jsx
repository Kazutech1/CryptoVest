import { useState } from "react";
import useInvestmentPlans from "../../hooks/useInvestmentsPlans";

const InvestmentPlans = () => {
  const {
    plans,
    loadingPlans,
    errorPlans,
    createInvestmentPlan,
    updateInvestmentPlan,
    deleteInvestmentPlan,
    loadingAction,
    errorAction,
    actionStatus,
  } = useInvestmentPlans();

  const [newPlan, setNewPlan] = useState({
    name: "",
    roi: "",
    minimum: "",
    duration: "",
    benefits: [],
  });

  const [editMode, setEditMode] = useState(null); // Holds the plan ID being edited
  const [updatedPlan, setUpdatedPlan] = useState({});

  const handleAddPlan = async () => {
    await createInvestmentPlan(newPlan);
    setNewPlan({ name: "", roi: "", minimum: "", duration: "", benefits: [] });
  };

  const handleUpdatePlan = async () => {
    await updateInvestmentPlan(editMode, updatedPlan);
    setEditMode(null);
    setUpdatedPlan({});
  };

  const handleDeletePlan = async (planId) => {
    await deleteInvestmentPlan(planId);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Investment Plans</h2>

      {loadingPlans && <p className="text-center text-white">Loading investment plans...</p>}
      {errorPlans && <p className="text-center text-red-400">{errorPlans}</p>}
      {errorAction && <p className="text-center text-red-400">{errorAction}</p>}
      {actionStatus && <p className="text-center text-green-400">{actionStatus}</p>}

      {/* Add Plan Form */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Add New Plan</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Plan Name"
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="ROI"
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white"
            value={newPlan.roi}
            onChange={(e) => setNewPlan({ ...newPlan, roi: e.target.value })}
          />
          <input
            type="number"
            placeholder="Minimum Investment"
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white"
            value={newPlan.minimum}
            onChange={(e) => setNewPlan({ ...newPlan, minimum: e.target.value })}
          />
          <input
            type="text"
            placeholder="Duration"
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white"
            value={newPlan.duration}
            onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
          />
          <button
            onClick={handleAddPlan}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg"
            disabled={loadingAction}
          >
            {loadingAction ? "Adding..." : "Add Plan"}
          </button>
        </div>
      </div>

      {/* Existing Plans List */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Current Plans</h3>
        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan._id} className="p-4 bg-white/5 rounded-lg">
              {editMode === plan._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Plan Name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white"
                    value={updatedPlan.name || plan.name}
                    onChange={(e) => setUpdatedPlan({ ...updatedPlan, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="ROI"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white"
                    value={updatedPlan.roi || plan.roi}
                    onChange={(e) => setUpdatedPlan({ ...updatedPlan, roi: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Minimum Investment"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white"
                    value={updatedPlan.minimum || plan.minimum}
                    onChange={(e) => setUpdatedPlan({ ...updatedPlan, minimum: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white"
                    value={updatedPlan.duration || plan.duration}
                    onChange={(e) => setUpdatedPlan({ ...updatedPlan, duration: e.target.value })}
                  />
                  <button
                    onClick={handleUpdatePlan}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg"
                    disabled={loadingAction}
                  >
                    {loadingAction ? "Updating..." : "Update Plan"}
                  </button>
                  <button
                    onClick={() => setEditMode(null)}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-white">{plan.name}</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditMode(plan._id)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan._id)}
                        className="text-red-400 hover:text-red-300"
                        disabled={loadingAction}
                      >
                        {loadingAction ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-300 mt-2">
                    <p>ROI: {plan.roi}</p>
                    <p>Minimum: ${plan.minimum}</p>
                    <p>Duration: {plan.duration}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlans;
