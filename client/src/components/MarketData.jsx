import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export const MarketData = () => {
  const [coins, setCoins] = useState([
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", current_price: 63000, price_change_percentage_24h: 2.5 },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", image: "https://cryptologos.cc/logos/ethereum-eth-logo.png", current_price: 3200, price_change_percentage_24h: 1.8 },
    { id: "solana", name: "Solana", symbol: "SOL", image: "https://cryptologos.cc/logos/solana-sol-logo.png", current_price: 140, price_change_percentage_24h: -0.6 },
    { id: "cwt-token", name: "CWT Token", symbol: "CWT", image: "https://cryptologos.cc/logos/tether-usdt-logo.png", current_price: 0.85, price_change_percentage_24h: 5.2 },
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch market data from CoinGecko
  const fetchMarketData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false"
      );
      const data = await response.json();
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
      setLoading(false);
    }
  };

  // Fetch data initially & update every 60 seconds
  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6"
      id="market"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <TrendingUp className="w-8 h-8 text-blue-400" />
          <h2 className="text-3xl font-bold text-white">Live Market Data</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {coins.map((coin, index) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-4">
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {coin.name}
                  </h3>
                  <p className="text-gray-400">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-white">
                  ${coin.current_price.toLocaleString()}
                </p>
                <span
                  className={`text-sm ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}% (24h)
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
