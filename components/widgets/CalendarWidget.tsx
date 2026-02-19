import React from 'react';
import { useHome } from '../../context/HomeContext';
import { Clock } from 'lucide-react';

export const CalendarWidget: React.FC = () => {
  const { events } = useHome();

  return (
    <div className="h-full flex flex-col bg-white p-4">
       <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
           <h3 className="font-black uppercase tracking-wider text-2xl">Schedule</h3>
           <Clock size={24} />
       </div>

       <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
           {events.map(event => (
               <div 
                key={event.id}
                className={`flex items-stretch border-2 border-black rounded-lg overflow-hidden ${event.isCurrent ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : ''}`}
               >
                   <div className={`w-24 p-3 flex flex-col justify-center items-center text-xs font-mono font-bold border-r-2 border-black
                        ${event.isCurrent ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
                       <span>{event.startTime}</span>
                       <div className="w-1 h-1 bg-current rounded-full my-1 opacity-50" />
                       <span className="opacity-70">{event.endTime}</span>
                   </div>
                   <div className="flex-1 p-3 flex items-center bg-white">
                       <span className={`font-bold text-lg leading-tight ${event.isCurrent ? 'underline decoration-2 underline-offset-4' : ''}`}>
                           {event.title}
                       </span>
                   </div>
               </div>
           ))}
           {events.length === 0 && (
               <div className="text-center italic text-gray-500 mt-10">No events scheduled today.</div>
           )}
       </div>
    </div>
  );
};