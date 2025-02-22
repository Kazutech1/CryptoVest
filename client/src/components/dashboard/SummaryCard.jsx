// src/components/SummaryCard.jsx
import React from 'react';
import { PieChart, DollarSign, BitcoinIcon, TrendingUp, BarChart } from 'lucide-react';
import { useState, useEffect } from 'react';
import  useSummaryData  from '../../hooks/useSummaryData';

export const SummaryCard = ({ title, value, change, icon: Icon, color }) => {
  const iconMap = {
    PieChart: PieChart,
    DollarSign: DollarSign,
    BitcoinIcon: BitcoinIcon,
    TrendingUp: BarChart,
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 flex-1 min-w-[calc(100%-32px)] md:min-w-0">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-gray-400 text-sm md:text-base">{title}</p>
          <p className="text-2xl md:text-2.5xl font-bold text-white">{value}</p>
        </div>
        <div className={`bg-${color}-500/20 p-2 md:p-3 rounded-full flex items-center justify-center`}>
          {React.createElement(iconMap[Icon], { className: `w-5 h-5 md:w-6 md:h-6 text-${color}-400` })}
        </div>
      </div>
    </div>
  );
};

// src/components/SummaryCarousel.jsx


export const SummaryCarousel = () => {
  const { summaryData, isLoading, error } = useSummaryData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);
  console.log(summaryData);
  

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setActiveIndex(prev => (prev === summaryData.length - 1 ? 0 : prev + 1));
      }, 5000);
      setAutoScrollInterval(interval);
      return () => clearInterval(interval);
    }
  }, [isMobile, summaryData]);

  const nextSlide = () => {
    clearInterval(autoScrollInterval);
    setActiveIndex((prev) => (prev === summaryData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    clearInterval(autoScrollInterval);
    setActiveIndex((prev) => (prev === 0 ? summaryData.length - 1 : prev - 1));
  };

  const handleDotClick = (index) => {
    clearInterval(autoScrollInterval);
    setActiveIndex(index);
  };

 if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
             <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Oops! Something went wrong. Please try again.</div>;
  }

  return (
    <div className="relative mb-6 md:mb-0">
      <div className="hidden md:grid grid-cols-4 gap-6 mb-5">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>
      {isMobile && (
        <div className="md:hidden relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {summaryData.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <SummaryCard {...item} />
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            {summaryData.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
