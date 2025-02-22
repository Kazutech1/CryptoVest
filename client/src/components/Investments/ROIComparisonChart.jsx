// ROIComparisonChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const ROIComparisonChart = ({ data }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
    <h2 className="text-xl font-semibold text-white mb-4">Historical ROI Comparison</h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: 'none',
              borderRadius: '8px'
            }}
          />
          <Line type="monotone" dataKey="conservative" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="balanced" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="aggressive" stroke="#8b5cf6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);