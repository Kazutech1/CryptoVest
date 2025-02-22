import { Users, BarChart, CreditCard, Bell, X } from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab, showSidebar, setShowSidebar }) => {
  const tabs = [
    { id: "users", icon: <Users />, label: "User Management" },
    { id: "plans", icon: <BarChart />, label: "Investment Plans" },
    { id: "withdrawals", icon: <CreditCard />, label: "Withdrawals" },
    { id: "announcements", icon: <Bell />, label: "Announcements" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white/5 backdrop-blur-sm border-r border-white/10 p-4 transform ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 z-50`}
    >
      {/* Close Button (Mobile) */}
      <button
        className="lg:hidden absolute top-4 right-4 bg-red-600 text-white p-2 rounded-md"
        onClick={() => setShowSidebar(false)}
      >
        <X />
      </button>

      <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>

      <nav className="space-y-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setShowSidebar(false);
            }}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
              activeTab === item.id
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
