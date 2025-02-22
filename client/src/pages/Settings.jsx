

import { useState } from 'react';
import { ProfileSection } from '../components/Settings/ProfileSection';
import { WalletAddressSection } from '../components/Settings/WalletAddressSection';
// import { PasswordSection } from '../components/Settings/PasswordSection';
import { SaveButton } from '../components/Settings/SaveButton.jsx';
import useProfile from '../hooks/useProfile.js';

export const WalletSettings = () => {
  const { profile, updateProfile, setProfile, error, successMessage } = useProfile();
  const [saving, setSaving] = useState(false);

  const handleProfileChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({ walletAddress: profile.walletAddress });
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Wallet Settings</h1>
          <p className="text-gray-400">Manage your profile, wallet address, and security settings.</p>
        </div>

        <form onSubmit={handleSave}>
        <ProfileSection profile={profile} errors={error} />

          <WalletAddressSection profile={profile} handleProfileChange={handleProfileChange} errors={error} />

          {successMessage && <p className="text-green-400">{successMessage}</p>}

          <SaveButton saving={saving} />
        </form>
      </div>
    </div>
  );
};
