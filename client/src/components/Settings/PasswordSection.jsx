// // src/components/settings/PasswordSection.jsx
// import { Lock } from 'lucide-react';

// export const PasswordSection = ({ password, handlePasswordChange, errors }) => {
//   return (
//     <div className="border border-white/10 rounded-xl p-6 mb-8">
//       <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
//         <Lock className="w-5 h-5" />
//         <span>Change Password</span>
//       </h2>

//       {/* Current Password Input */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
//         <input
//           type="password"
//           name="currentPassword"
//           value={password.currentPassword}
//           onChange={handlePasswordChange}
//           className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter current password"
//         />
//       </div>

//       {/* New Password Input */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
//         <input
//           type="password"
//           name="newPassword"
//           value={password.newPassword}
//           onChange={handlePasswordChange}
//           className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter new password"
//         />
//         {errors.newPassword && <p className="text-sm text-red-400 mt-1">{errors.newPassword}</p>}
//       </div>

//       {/* Confirm New Password Input */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
//         <input
//           type="password"
//           name="confirmNewPassword"
//           value={password.confirmNewPassword}
//           onChange={handlePasswordChange}
//           className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Confirm new password"
//         />
//         {errors.confirmNewPassword && (
//           <p className="text-sm text-red-400 mt-1">{errors.confirmNewPassword}</p>
//         )}
//       </div>
//     </div>
//   );
// };