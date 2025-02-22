// src/components/FeatureCard.jsx

export const FeatureCard  = ({ icon, title, description }) => {
    return (
      <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition">
        <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    );
  };

// import { useAuth } from "../context/AuthContext";

// const Navbarl = () => {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     alert("Logged out successfully!");
//   };

//   return (
//     <nav>
//       <h1>My App</h1>
//       {user && <button onClick={handleLogout}>Logout</button>}
//     </nav>
//   );
// };

// export default Navbarl;
