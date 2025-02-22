// ComparisonTable.jsx
export const ComparisonTable = ({ plans }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Plan Comparison</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-3 text-left text-gray-400 font-medium">Feature</th>
              {plans.map((plan, index) => (
                <th key={index} className="pb-3 text-center font-medium text-white">
                  {plan.type}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[ 'Minimum Investment', 'ROI Range', 'Liquidity', 'Insurance'].map((feature, index) => (
              <tr key={index} className="border-b border-white/10 last:border-0">
                <td className="py-3 text-gray-400">{feature}</td>
                {plans.map((plan, pIndex) => (
                  <td key={pIndex} className="py-3 text-center text-white">
                    {
                     feature === 'Minimum Investment' ? `${plan.minimum}TRX` :
                     feature === 'ROI Range' ? plan.roi :
                     feature === 'Liquidity' ? (plan.type === 'Conservative' ? 'Daily' : 
                     plan.type === 'Index Fund' ? 'Monthly' : 'Weekly') :
                     plan.type === 'Conservative' ? 'No' : 'Yes'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );