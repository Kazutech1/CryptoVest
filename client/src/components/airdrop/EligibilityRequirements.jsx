import { AlertCircle, CheckCircle2 } from "lucide-react";

export const EligibilityRequirements = ({ requirements }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Eligibility Requirements</h3>
      <div className="space-y-3">
        {requirements.map((req) => (
          <div key={req.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-gray-300">{req.task}</span>
            {req.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );