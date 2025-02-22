import { X } from "lucide-react";


export const AnnouncementPopup = ({ isOpen, onClose, announcements }) => {
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000]">
      <div className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 rounded-2xl p-6 max-w-sm w-full border border-white/10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Announcements</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Announcement List */}
        <div
          className="flex flex-col space-y-4 overflow-y-auto max-h-72 pr-2"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}
        >
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 via-blue-800/10 to-gray-800 rounded-lg p-4 border border-gray-700 hover:shadow-md transition-transform transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-white">
                {announcement.title}
              </h3>
              <p className="mt-2 text-gray-400">{announcement.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
