import { User, Mail } from 'lucide-react';

export const ProfileSection = ({ profile }) => {
  return (
    <div className="border border-white/10 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <User className="w-5 h-5" />
        <span>Profile Information</span>
      </h2>

      {/* Name Input (Disabled) */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
        <input
          type="text"
          name="username"
          value={profile?.username || ''}
          disabled
          className="bg-white/10 border border-white/20 rounded-lg w-full p-3 text-gray-400 cursor-not-allowed"
          placeholder="Enter your name"
        />
      </div>

      {/* Email Input (Disabled) */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={profile?.email || ''}
          disabled
          className="bg-white/10 border border-white/20 rounded-lg w-full p-3 text-gray-400 cursor-not-allowed"
          placeholder="Enter your email"
        />
      </div>
    </div>
  );
};
