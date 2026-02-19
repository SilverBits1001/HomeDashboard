import React, { useState, useEffect } from 'react';
import { useHome } from '../context/HomeContext';
import { Cloud, Moon, Calendar } from 'lucide-react';

export const Screensaver: React.FC = () => {
  const { setScreensaver, weather } = useHome();
  const [date, setDate] = useState(new Date());

  // Only check date change once per minute, but don't cause re-renders unless the DAY changes.
  // This avoids the 60hz/1hz refresh cycle of a clock.
  useEffect(() => {
    const timer = setInterval(() => {
        const now = new Date();
        if (now.getDate() !== date.getDate()) {
            setDate(now);
        }
    }, 60000); 
    return () => clearInterval(timer);
  }, [date]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const today = date.getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return (
    <div 
      onClick={() => setScreensaver(false)}
      className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-8 cursor-pointer"
    >
        <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl gap-8">
            
            {/* Massive Day Display - Static */}
            <div className="text-center space-y-2">
                <div className="text-[8rem] md:text-[10rem] leading-[0.8] font-black tracking-tighter uppercase">
                    {date.toLocaleDateString(undefined, { weekday: 'long' })}
                </div>
                <div className="text-3xl md:text-5xl font-mono font-bold uppercase tracking-widest border-t-4 border-black pt-4 inline-block">
                    {date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Content Row */}
            <div className="flex flex-col md:flex-row w-full gap-8 md:gap-16 justify-center items-center md:items-start mt-12">
                
                {/* Monthly Calendar */}
                <div className="w-full max-w-xs md:max-w-sm border-2 border-black p-4 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                   <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
                       <Calendar size={24} />
                       <span className="font-bold text-lg uppercase tracking-wider">Month View</span>
                   </div>
                   <div className="grid grid-cols-7 gap-2 mb-2">
                       {weekDays.map(d => (
                           <div key={d} className="text-center font-bold text-xs">{d}</div>
                       ))}
                   </div>
                   <div className="grid grid-cols-7 gap-2">
                       {days.map((d, i) => (
                           <div key={i} className="aspect-square flex items-center justify-center">
                               {d && (
                                   <div className={`w-8 h-8 flex items-center justify-center rounded-sm text-lg font-bold font-mono
                                       ${d === today ? 'bg-black text-white' : 'text-black'}`}>
                                       {d}
                                   </div>
                               )}
                           </div>
                       ))}
                   </div>
                </div>

                {/* Weather Forecast Summary */}
                <div className="w-full max-w-xs md:max-w-sm flex flex-col justify-between h-full space-y-6">
                    <div className="flex items-center justify-between border-b-4 border-black pb-4">
                         <div className="flex flex-col">
                            <span className="text-sm font-mono font-bold uppercase">Forecast</span>
                            <span className="text-4xl font-black uppercase">{weather.condition}</span>
                         </div>
                         <div className="text-6xl font-black">{Math.round(weather.temp)}°</div>
                    </div>
                    
                    <div className="space-y-3">
                        {weather.forecast.map((f, i) => (
                            <div key={i} className="flex justify-between items-center text-xl font-mono font-bold">
                                <span className="uppercase">{f.day}</span>
                                <div className="flex-1 mx-4 border-b-2 border-dotted border-gray-400 relative top-[-4px]" />
                                <span>{f.temp}°</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="absolute bottom-8 flex items-center gap-2 text-black text-sm font-bold uppercase tracking-widest opacity-40">
            <Moon size={16} />
            <span>Standing By</span>
        </div>
    </div>
  );
};