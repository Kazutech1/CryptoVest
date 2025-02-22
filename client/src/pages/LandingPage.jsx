import { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { Hero } from "../components/Hero";
import {Navbar} from '../components/NavBar'
import { MarketData } from "../components/MarketData";
import { Features } from "../components/Features";
import { Staking } from "../components/Staking";
import { Tokenomics } from "../components/Tokenomics";
import { Roadmap } from "../components/Roadmap";
import { Partners } from "../components/Partners";
import { FAQ } from "../components/FAQ";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";

export default function Home() {
  const [countdown] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  // Animation variants for fade-in effect
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Navbar />
      <Hero countdown={countdown} />

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <MarketData />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <Features />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <Staking />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <Tokenomics />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <Roadmap />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <Partners />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <FAQ />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <CTA />
      </motion.div>

      <Footer />
    </div>
  );
}
