import { Share2, Twitch, Twitter } from "lucide-react";

export const SocialVerification = ({ onTwitterConnect, onDiscordConnect }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-400">Social Verification</h3>
        <Share2 className="w-6 h-6 text-blue-400" />
      </div>
      <div className="flex space-x-4">
        <button 
          onClick={onTwitterConnect}
          className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition"
        >
          <Twitter className="w-5 h-5 text-blue-400" />
        </button>
        <button
          onClick={onDiscordConnect}
          className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition"
        >
          <Twitch className="w-5 h-5 text-purple-400" />
        </button>
      </div>
    </div>
  );