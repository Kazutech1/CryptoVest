import { motion } from "framer-motion"; // Import Framer Motion
import { TimeUnit } from "./TimeUnit";
import { Link } from "react-router-dom";
import hero from "../assets/hero2.png";

export const Hero = ({ countdown }) => {
  // Animation variants
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const buttonHover = {
    whileHover: { scale: 1.05 },
  };

  return (
    <motion.div
      className="pt-32 pb-20 px-2 overflow-hidden"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">
        {/* Left Section */}
        <motion.div
          className="w-full md:w-1/2 mb-12 md:mb-0 px-4 text-center md:text-left"
          variants={fadeInLeft}
        >
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-xs px-3 py-1.5 rounded-full inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            🚀 Airdrop Announcement Coming Soon
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Revolutionize Your Crypto Portfolio
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Institutional-grade crypto investment platform with AI-powered
            strategies, staking rewards, and exclusive airdrop opportunities.
          </p>

          <motion.div
            className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4"
            variants={fadeInUp}
          >
            <Link to="/signup">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-semibold transition w-full md:w-auto"
                {...buttonHover}
              >
                Start Investing
              </motion.button>
            </Link>
            <motion.button
              className="border border-blue-500 text-blue-500 hover:bg-blue-500/10 px-8 py-4 rounded-full text-lg font-semibold transition w-full md:w-auto"
              {...buttonHover}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Countdown Section */}
          <motion.div
            className="mt-12 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col"
            variants={fadeInUp}
          >
            <h3 className="text-gray-300 mb-4 text-center md:text-left">
              Airdrop Countdown
            </h3>
            <motion.div
              className="flex justify-center md:justify-start space-x-3 sm:space-x-6"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.3 }} // Stagger animation for each unit
            >
              <motion.div variants={fadeInUp}>
                <TimeUnit value={countdown.days} label="Days" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <TimeUnit value={countdown.hours} label="Hours" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <TimeUnit value={countdown.minutes} label="Minutes" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <TimeUnit value={countdown.seconds} label="Seconds" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Section (Image) */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          variants={fadeInRight}
        >
          <motion.div
            className="relative w-[90%] max-w-xs md:max-w-md flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-3xl opacity-30 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.img
              src={hero}
              alt="Investment Chart"
              className="rounded-full w-40 h-40 md:w-64 md:h-64 object-cover"
              animate={{
                y: [0, -20, 0], // Bounce effect
                rotate: [0, 1, -10, 0], // Slight rotation effect
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="mt-6 text-center"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <p className="text-gray-300">Current APY</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                12.8%
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
