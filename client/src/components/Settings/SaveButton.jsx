import { Save } from 'lucide-react';

export const SaveButton = ({ saving }) => {
  return (
    <div className="border border-white/10 rounded-xl p-6">
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-purple-600 w-full py-3 rounded-lg text-white hover:from-blue-500 hover:to-purple-500 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        disabled={saving}
      >
        <Save className="w-5 h-5" />
        <span>{saving ? 'Saving...' : 'Save Changes'}</span>
      </button>
    </div>
  );
};
