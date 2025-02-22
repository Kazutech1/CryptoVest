import { useState } from "react";
import useAnnouncements from "../../hooks/useAdminAnnouncement";

const Announcements = () => {
  const {
    announcements,
    loading,
    error,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    loadingAction,
    actionStatus,
  } = useAnnouncements();

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });

  const handleSendAnnouncement = async () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      return;
    }

    await createAnnouncement(newAnnouncement);
    setNewAnnouncement({ title: "", content: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Announcements</h2>

      {error && <p className="text-red-500">{error}</p>}
      {actionStatus && <p className="text-green-500">{actionStatus}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Announcement */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">New Announcement</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white"
              value={newAnnouncement.title}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white min-h-[150px]"
              value={newAnnouncement.content}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
              }
            />
            <button
              onClick={handleSendAnnouncement}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg disabled:opacity-50"
              disabled={loadingAction}
            >
              {loadingAction ? "Sending..." : "Send Announcement"}
            </button>
          </div>
        </div>

        {/* Existing Announcements */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Announcements</h3>
          {loading ? (
            <p className="text-white text-center">Loading announcements...</p>
          ) : announcements.length === 0 ? (
            <p className="text-white text-center">No announcements available.</p>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement._id} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-white">{announcement.title}</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          updateAnnouncement(announcement._id, { title: "Updated Title" })
                        }
                        className="text-blue-400 hover:text-blue-300"
                        disabled={loadingAction}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAnnouncement(announcement._id)}
                        className="text-red-400 hover:text-red-300"
                        disabled={loadingAction}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-2">{announcement.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
