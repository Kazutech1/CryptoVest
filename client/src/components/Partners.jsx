import binance from '../assets/binance.svg';
import coinbase from '../assets/coinbase.svg';
import chainlink from '../assets/chainlink.svg';
import polygon from '../assets/polygon.png';
import metamask from '../assets/metamask.jpg';

export const Partners = () => {
  const partners = [
    { name: 'binance', logo: binance }, // White
    { name: 'coinbase', logo: coinbase,  }, // Blue
    { name: 'metamask', logo: metamask,  }, // Yellow
    { name: 'chainlink', logo: chainlink,  }, // Purple
    { name: 'polygon', logo: polygon,  }, // Green
  ];

  return (
    <div className="py-20 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-gray-400 text-center mb-8">Trusted by leading organizations</h3>
        <div className="flex flex-wrap justify-center gap-12 opacity-75">
          {partners.map((partner, index) => (
            <div key={index} className="relative">
              <img 
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain  hover:grayscale-0 transition "
               // Apply dynamic color filter
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};