import React, { useState, useEffect } from 'react';

interface ZenQuoteProps {
  theme: 'day' | 'night';
}

const quotes = [
  { text: "When you realize nothing is lacking, the whole world belongs to you.", author: "Lao Tzu" },
  { text: "The only Zen you find on the tops of mountains is the Zen you bring up there.", author: "Robert M. Pirsig" },
  { text: "Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.", author: "Zen Proverb" },
  { text: "When you do something, you should burn yourself completely, like a good bonfire, leaving no trace of yourself.", author: "Shunryu Suzuki" },
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" }
];

export default function ZenQuote({ theme }: ZenQuoteProps) {
  const [quote, setQuote] = useState(quotes[0]);
  const [fadeIn, setFadeIn] = useState(true);

  const nextQuote = () => {
    setFadeIn(false);
    setTimeout(() => {
      const currentIndex = quotes.findIndex(q => q.text === quote.text);
      const nextIndex = (currentIndex + 1) % quotes.length;
      setQuote(quotes[nextIndex]);
      setFadeIn(true);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(nextQuote, 10000);
    return () => clearInterval(interval);
  }, [quote]);

  return (
    <div className="text-center max-w-md">
      <blockquote 
        className={`transition-all duration-500 transform ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className={`text-xl font-light leading-relaxed tracking-wide mb-6 ${
          theme === 'day' ? 'text-slate-700' : 'text-slate-200'
        }`}>
          "{quote.text}"
        </p>
        <footer className={`text-sm font-light tracking-wider ${
          theme === 'day' ? 'text-slate-500' : 'text-slate-400'
        }`}>
          — {quote.author}
        </footer>
      </blockquote>
    </div>
  );
}