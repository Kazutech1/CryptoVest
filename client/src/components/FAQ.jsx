// src/components/FAQ.jsx
import { ChevronDown } from 'lucide-react';

export const FAQ = () => {
  const faqs = [
    {
      question: 'How do I participate in the airdrop?',
      answer: 'Hold at least 100 CWT tokens in your wallet during the snapshot period.'
    },
    {
      question: 'What security measures are in place?',
      answer: 'We use multi-sig wallets, cold storage, and regular security audits.'
    },
    {
      question: 'Can I unstake my tokens early?',
      answer: 'Early unstaking incurs a 10% fee and forfeits rewards.'
    }
  ];

  return (
    <div className="py-20 px-6" id="faq">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 rounded-lg group">
              <details className="p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 transition group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-gray-300">{faq.answer}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};