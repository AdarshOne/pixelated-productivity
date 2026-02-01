"use client";

import { useState, useMemo } from "react";

export function MiniCalendar() {
  const [monthOffset, setMonthOffset] = useState(0);
  
  const { month, year, days, today, todayMonth, todayYear, firstDay } = useMemo(() => {
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Calculate target month with offset
    const targetDate = new Date(currentYear, currentMonth + monthOffset, 1);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();
    
    // Get first day of month and total days
    const firstDayOfMonth = new Date(targetYear, targetMonth, 1).getDay();
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    return {
      month: monthNames[targetMonth],
      year: targetYear,
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      today: currentDay,
      todayMonth: currentMonth,
      todayYear: currentYear,
      firstDay: firstDayOfMonth,
      targetMonth,
    };
  }, [monthOffset]);

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Check if we're viewing the current month
  const now = new Date();
  const isCurrentMonth = monthOffset === 0;
  const targetMonth = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1).getMonth();

  // Check if a day is in the past
  const isPastDay = (day: number) => {
    if (!isCurrentMonth) {
      // If viewing a past month entirely
      if (monthOffset < 0) return true;
      return false;
    }
    return day < today;
  };

  const canGoBack = monthOffset > -12;
  const canGoForward = monthOffset < 12;

  return (
    <div className="border-2 border-foreground bg-background">
      {/* Calendar header with navigation */}
      <div className="border-b-2 border-foreground px-2 py-1 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setMonthOffset(prev => prev - 1)}
          disabled={!canGoBack}
          className={`w-7 h-7 border-2 border-foreground flex items-center justify-center text-base ${
            canGoBack ? 'hover:bg-foreground hover:text-background' : 'opacity-30 cursor-not-allowed'
          }`}
          aria-label="Previous month"
        >
          {'<'}
        </button>
        <span className="text-lg font-bold">{month} {year}</span>
        <button
          type="button"
          onClick={() => setMonthOffset(prev => prev + 1)}
          disabled={!canGoForward}
          className={`w-7 h-7 border-2 border-foreground flex items-center justify-center text-base ${
            canGoForward ? 'hover:bg-foreground hover:text-background' : 'opacity-30 cursor-not-allowed'
          }`}
          aria-label="Next month"
        >
          {'>'}
        </button>
      </div>
      
      <div className="grid grid-cols-7 border-b border-foreground">
        {dayNames.map((name, i) => (
          <div 
            key={`day-${name}-${i}`}
            className="text-center text-base py-1"
          >
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-base">
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="h-7" />
        ))}
        {days.map(day => {
          const isToday = isCurrentMonth && day === today;
          const isPast = isPastDay(day);
          return (
            <div
              key={day}
              className={`h-7 flex items-center justify-center relative ${
                isToday 
                  ? 'bg-foreground text-background font-bold' 
                  : ''
              }`}
            >
              <span className={isPast && !isToday ? 'relative' : ''}>
                {day}
                {isPast && !isToday && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-full h-[1px] bg-foreground transform rotate-[-45deg]" style={{ width: '12px' }} />
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
