import React, { useEffect, useState } from 'react';
import { WeatherWidget } from '../components/widgets/WeatherWidget';
import { ChoresWidget } from '../components/widgets/ChoresWidget';
import { DeviceControlWidget } from '../components/widgets/DeviceControlWidget';
import { PackageWidget } from '../components/widgets/PackageWidget';
import { UpcomingWidget } from '../components/widgets/UpcomingWidget';
import { useHome } from '../context/HomeContext';
import { MessageSquare } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { weather, chores, packages } = useHome();
  const [greeting, setGreeting] = useState('Welcome Home');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const urgentCount = chores.filter(c => !c.completed).length;
  const packageCount = packages.filter(p => p.status === 'Out for Delivery').length;

  return (
    <div className="h-full flex flex-col gap-3">
      
      {/* Compact Header for Vertical View */}
      <header className="flex-shrink-0 flex justify-between items-center border-b-2 border-black pb-2 min-h-[40px]">
        <div>
           <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">Nexus</h1>
        </div>
        
        {/* Short Status */}
        <div className="flex items-center gap-2 text-right">
             <div className="text-xs font-bold font-mono">
                 {greeting}. {urgentCount} Tasks.
             </div>
             <MessageSquare size={16} strokeWidth={2.5} />
        </div>
      </header>

      {/* Main Grid - Vertical Portrait Optimization (2 Columns, 12 Rows) */}
      <div className="flex-1 grid grid-cols-2 grid-rows-[repeat(12,minmax(0,1fr))] gap-3 min-h-0">
         
         {/* Row 1-3 (25% Height): Environment & Status */}
         <div className="col-span-1 row-span-3 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <WeatherWidget />
         </div>

         <div className="col-span-1 row-span-3 flex flex-col gap-3">
             <div className="flex-1 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                <UpcomingWidget />
             </div>
             <div className="flex-1 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                <PackageWidget />
             </div>
         </div>

         {/* Row 4-10 (60% Height): Main Controls (Spans Full Width) */}
         <div className="col-span-2 row-span-7 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <DeviceControlWidget />
         </div>

         {/* Row 11-12 (15% Height): Quick Tasks (Spans Full Width) */}
         <div className="col-span-2 row-span-2 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
            <ChoresWidget />
         </div>
      </div>
    </div>
  );
};