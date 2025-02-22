// src/components/AnnouncementsSection.js
import React from 'react';
import { Bell, Pencil } from 'lucide-react';
import useAnnouncements from '../../hooks/useAnnouncements.js';
import { LoadingSpinner } from '../Loading';

const AnnouncementsSection = () => {
  const { announcements, loading, error } = useAnnouncements();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
             <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mt-5 mx-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Bell className="w-6 h-6 mr-2 text-yellow-400" />
          Announcements
        </h3>
        <span className="text-sm bg-yellow-400/10 px-2 py-1 rounded-md text-yellow-400">
          {announcements.length} Updates
        </span>
      </div>
      {/* Announcements List */}
      <div className="space-y-3">
        {announcements.map((announcement, index) => (
          <AnnouncementItem key={index} {...announcement} />
        ))}
      </div>
    </div>
  );
};

const AnnouncementItem = ({ title, content }) => (
  <div className="group flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition border border-white/10">
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg bg-green-400/20`}>
        <Bell className={`w-5 h-5 text-green-400`} />
      </div>
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-gray-400">{content}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      {/* Optional Admin Edit Button */}
      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white">
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default AnnouncementsSection;
