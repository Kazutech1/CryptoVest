// src/components/Footer.jsx
export const Footer = () => {
    return (
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">CryptoWealth</h3>
              <p className="text-gray-400 text-sm">
                Empowering financial freedom through decentralized wealth management solutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#staking" className="text-gray-400 hover:text-white transition">Staking</a></li>
                <li><a href="#market" className="text-gray-400 hover:text-white transition">Market</a></li>
                <li><a href="#tokenomics" className="text-gray-400 hover:text-white transition">Tokenomics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="#blog" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#careers" className="text-gray-400 hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#privacy" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                <li><a href="#terms" className="text-gray-400 hover:text-white transition">Terms</a></li>
                <li><a href="#risk" className="text-gray-400 hover:text-white transition">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2024 CryptoWealth. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };