import { Link } from "react-router-dom";

// src/components/CTA.jsx
export const CTA = () => {
    return (
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join the Crypto Revolution?</h2>
          <p className="text-gray-400 mb-8">
            Start your journey towards financial freedom today. Don't miss out on exclusive airdrop opportunities!
          </p>
          <Link to='/signup'>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all">
            Get Started Now
          </button>
          </Link>
        </div>
      </div>
    );
  };