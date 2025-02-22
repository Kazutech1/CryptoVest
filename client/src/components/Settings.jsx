// // src/pages/WalletSettings.jsx
// import { useState } from 'react';
// import { Lock, User, Mail, Save, Wallet } from 'lucide-react';

// export const WalletSettings = () => {
//   // State for profile information
//   const [profile, setProfile] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     walletAddress: '0x1f...C4B2', // Default wallet address
//   });

//   // State for password reset
//   const [password, setPassword] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmNewPassword: '',
//   });

//   // State for form errors
//   const [errors, setErrors] = useState({});

//   // Handle profile information change
//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle password change
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPassword((prev) => ({ ...prev, [name]: value }));
//   };

//   // Validate form inputs
//   const validateForm = () => {
//     const newErrors = {};

//     // Profile validation
//     if (!profile.name.trim()) {
//       newErrors.name = 'Name is required';
//     }
//     if (!profile.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
//       newErrors.email = 'Invalid email address';
//     }

//     // Wallet Address validation
//     if (!profile.walletAddress.trim()) {
//       newErrors.walletAddress = 'Wallet address is required';
//     } else if (!/^0x[a-fA-F0-9]{40}$/.test(profile.walletAddress)) {
//       newErrors.walletAddress = 'Invalid wallet address';
//     }

//     // Password validation
//     if (password.newPassword && password.newPassword.length < 8) {
//       newErrors.newPassword = 'Password must be at least 8 characters';
//     }
//     if (password.newPassword !== password.confirmNewPassword) {
//       newErrors.confirmNewPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Simulate saving changes
//       console.log('Profile updated:', profile);
//       console.log('Password updated:', password);
//       alert('Settings saved successfully!');
//     } else {
//       alert('Please fix the errors before submitting.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-white">Wallet Settings</h1>
//           <p className="text-gray-400">Manage your profile, wallet address, and security settings.</p>
//         </div>

//         {/* Profile Settings Form */}
//         <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
//           {/* Profile Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
//               <User className="w-5 h-5" />
//               <span>Profile Information</span>
//             </h2>

//             {/* Name Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={profile.name}
//                 onChange={handleProfileChange}
//                 className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your name"
//               />
//               {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
//             </div>

//             {/* Email Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={profile.email}
//                 onChange={handleProfileChange}
//                 className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your email"
//               />
//               {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
//             </div>
//           </div>

//           {/* Wallet Address Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
//               <Wallet className="w-5 h-5" />
//               <span>Wallet Address</span>
//             </h2>

//             {/* Wallet Address Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-400 mb-2">Wallet Address</label>
//               <input
//                 type="text"
//                 name="walletAddress"
//                 value={profile.walletAddress}
//                 onChange={handleProfileChange}
//                 className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your wallet address"
//               />
//               {errors.walletAddress && <p className="text-sm text-red-400 mt-1">{errors.walletAddress}</p>}
//             </div>
//           </div>

//           {/* Password Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
//               <Lock className="w-5 h-5" />
//               <span>Change Password</span>
//             </h2>

//             {/* Current Password Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
//               <input
//                 type="password"
//                 name="currentPassword"
//                 value={password.currentPassword}
//                 onChange={handlePasswordChange}
//                 className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter current password"
//               />
//             </div>

//             {/* New Password Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
//               <input
//                 type="password"
//                 name="newPassword"
//                 value={password.newPassword}
//                 onChange={handlePasswordChange}
//                 className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter new password"
//               />
//               {errors.newPassword && <p className="text-sm text-red-400 mt-1">{errors.newPassword}</p>}
//             </div>

//             {/* Confirm New Password Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
//               <input
//                 type="password"
//                 name="confirmNewPassword"
//                 value={password.confirmNewPassword}
//                 onChange={handlePasswordChange}
//                 className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Confirm new password"
//               />
//               {errors.confirmNewPassword && (
//                 <p className="text-sm text-red-400 mt-1">{errors.confirmNewPassword}</p>
//               )}
//             </div>
//           </div>

//           {/* Save Button */}
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-blue-600 to-purple-600 w-full py-3 rounded-lg text-white hover:from-blue-500 hover:to-purple-500 transition-all flex items-center justify-center space-x-2"
//           >
//             <Save className="w-5 h-5" />
//             <span>Save Changes</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };