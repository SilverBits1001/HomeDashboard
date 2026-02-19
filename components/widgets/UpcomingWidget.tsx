import React from 'react';
import { useHome } from '../../context/HomeContext';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const UpcomingWidget: React.FC = () => {
  const { events } = useHome();
  
  // Find the current or next event
  const nextEvent = events.find(e => e.isCurrent) || events[0];

  return (
    <div className="h-full flex flex-col bg-white p-4 relative overflow-hidden group">
       <div className="flex justify-between items-center mb-2">
           <h3 className="font-black uppercase tracking-wider text-lg border-b-2 border-black">Up Next</h3>
           <Calendar size={20} />
       </div>

       {nextEvent ? (
           <div className="flex-1 flex flex-col justify-center">
               <div className="flex items-center gap-2 text-xs font-mono font-bold text-black mb-1">
                    <Clock size={12} />
                    <span>{nextEvent.startTime} - {nextEvent.endTime}</span>
                    {nextEvent.isCurrent && <span className="bg-black text-white px-1 ml-auto">NOW</span>}
               </div>
               <div className="text-xl font-bold leading-tight line-clamp-2">
                   {nextEvent.title}
               </div>
           </div>
       ) : (
           <div className="flex-1 flex items-center justify-center text-black font-mono text-sm border-2 border-dashed border-black m-2">
               No upcoming events
           </div>
       )}
       
       <div className="absolute bottom-2 right-2">
           <ArrowRight size={16} />
       </div>
    </div>
  );
};