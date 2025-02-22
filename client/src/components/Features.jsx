import { motion } from "framer-motion";
import { Lock, LineChart, Gift } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const Features = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-black/20"
      id="features"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold text-white text-center mb-4"
        >
          Why Choose CryptoWealth?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          Our platform offers a comprehensive suite of tools and features
          designed to maximize your crypto investment potential.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Lock className="w-8 h-8" />,
              title: "Secure Storage",
              description:
                "Institutional-grade security with multi-chain cold storage solutions",
            },
            {
              icon: <LineChart className="w-8 h-8" />,
              title: "AI-Powered Strategies",
              description:
                "Advanced algorithms for optimal portfolio management",
            },
            {
              icon: <Gift className="w-8 h-8" />,
              title: "Airdrop Rewards",
              description:
                "Exclusive access to token airdrops and ecosystem rewards",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
