"use client";

import { useState, useEffect } from "react";

const quotes = [
  { text: "THE SECRET OF GETTING AHEAD IS GETTING STARTED.", author: "MARK TWAIN" },
  { text: "FOCUS ON BEING PRODUCTIVE INSTEAD OF BUSY.", author: "TIM FERRISS" },
  { text: "DO THE HARD JOBS FIRST. THE EASY JOBS WILL TAKE CARE OF THEMSELVES.", author: "DALE CARNEGIE" },
  { text: "IT IS NOT ENOUGH TO BE BUSY. THE QUESTION IS: WHAT ARE WE BUSY ABOUT?", author: "THOREAU" },
  { text: "ACTION IS THE FOUNDATIONAL KEY TO ALL SUCCESS.", author: "PICASSO" },
  { text: "AMATEURS SIT AND WAIT FOR INSPIRATION. THE REST OF US JUST GET UP AND GO TO WORK.", author: "STEPHEN KING" },
  { text: "START WHERE YOU ARE. USE WHAT YOU HAVE. DO WHAT YOU CAN.", author: "ARTHUR ASHE" },
  { text: "THE WAY TO GET STARTED IS TO QUIT TALKING AND BEGIN DOING.", author: "WALT DISNEY" },
  { text: "YOU DON'T HAVE TO BE GREAT TO START, BUT YOU HAVE TO START TO BE GREAT.", author: "ZIG ZIGLAR" },
  { text: "PRODUCTIVITY IS NEVER AN ACCIDENT. IT IS ALWAYS THE RESULT OF COMMITMENT.", author: "PAUL J. MEYER" },
  { text: "EITHER YOU RUN THE DAY OR THE DAY RUNS YOU.", author: "JIM ROHN" },
  { text: "SUCCESSFUL PEOPLE DO WHAT UNSUCCESSFUL PEOPLE ARE NOT WILLING TO DO.", author: "JIM ROHN" },
  { text: "YOUR FUTURE IS CREATED BY WHAT YOU DO TODAY, NOT TOMORROW.", author: "ROBERT KIYOSAKI" },
  { text: "THE ONLY WAY TO DO GREAT WORK IS TO LOVE WHAT YOU DO.", author: "STEVE JOBS" },
  { text: "DISCIPLINE IS CHOOSING BETWEEN WHAT YOU WANT NOW AND WHAT YOU WANT MOST.", author: "ABRAHAM LINCOLN" },
];

export function MotivationalQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Set initial quote based on current time to make it feel random on load
    const initialIndex = Math.floor(Date.now() / 1000) % quotes.length;
    setQuoteIndex(initialIndex);

    // Rotate every 30 seconds
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[quoteIndex];

  return (
    <div className="border-2 border-foreground p-3 bg-background">
      <div className="flex items-start gap-2">
        <span className="text-lg flex-shrink-0">{'"'}</span>
        <div className="flex-1">
          <p className="text-sm leading-relaxed">{currentQuote.text}</p>
          <p className="text-xs mt-1 opacity-70">- {currentQuote.author}</p>
        </div>
        <span className="text-lg flex-shrink-0">{'"'}</span>
      </div>
    </div>
  );
}
