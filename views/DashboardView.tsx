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
    <div className="h-full flex flex-col gap-4">
      
      {/* Header */}
      <header className="flex-shrink-0 flex justify-between items-end border-b-2 border-black pb-3 min-h-[60px]">
        <div>
           <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Nexus</h1>
           <p className="text-xs md:text-sm font-mono font-bold uppercase text-gray-500">
               {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
           </p>
        </div>
        
        {/* Status Message */}
        <div className="hidden md:flex items-center gap-4 max-w-lg text-right pl-4">
             <div className="text-xs md:text-sm font-medium leading-tight">
                 {greeting}. {urgentCount} chores pending. {packageCount > 0 ? `${packageCount} packages arriving.` : 'No mail expected.'}
             </div>
             <MessageSquare size={20} strokeWidth={2.5} className="flex-shrink-0" />
        </div>
      </header>

      {/* Main Grid Layout - 4 Columns, 6 Rows */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-6 gap-4 min-h-0">
         
         {/* LEFT COLUMN: Environment (Full Height) */}
         <div className="md:row-span-6 md:col-span-1 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <WeatherWidget />
         </div>

         {/* CENTER COLUMN: Control Hub (Full Height) */}
         {/* Now spans all 6 rows since Scenes are removed */}
         <div className="md:row-span-6 md:col-span-2 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <DeviceControlWidget />
         </div>

         {/* RIGHT COLUMN: Info Stack (3 widgets, 2 rows each) */}
         
         {/* Top: Next Event */}
         <div className="md:row-span-2 md:col-span-1 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
             <UpcomingWidget />
         </div>

         {/* Middle: Mail */}
         <div className="md:row-span-2 md:col-span-1 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
             <PackageWidget />
         </div>

         {/* Bottom: Chores */}
         <div className="md:row-span-2 md:col-span-1 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
            <ChoresWidget />
         </div>
      </div>
    </div>
  );
};