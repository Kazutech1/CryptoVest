import { Link } from 'react-router-dom';
import logo from '../assets/hero2.png'

export const Navbar = () => {
  return (
    <nav className="px-6 py-4 fixed top-0 left-0 w-full bg-opacity-30 border-b border-gray-800 z-50 backdrop-blur-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <img 
              src={logo}
              alt="Investment Chart"
              className="rounded-full object-cover" // Add animate-bounce class
            />
          </div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            CryptoWealth
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
          <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
          <a href="#tokenomics" className="text-gray-300 hover:text-white transition">Tokenomics</a>
          <a href="#roadmap" className="text-gray-300 hover:text-white transition">Roadmap</a>
        </div>

        {/* Sign In Button */}
        <Link to='/login'>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all">
          Sign In
        </button>
        </Link>
       
      </div>
    </nav>
  );
};
