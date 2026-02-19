import React from 'react';
import { Home, Layers, CalendarDays, Moon } from 'lucide-react';
import { AppView } from '../types';
import { useHome } from '../context/HomeContext';
import { Screensaver } from './Screensaver';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const { isScreensaver, setScreensaver } = useHome();

  return (
    <div className="h-screen w-screen bg-white text-black flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* Screensaver Overlay */}
      {isScreensaver && <Screensaver />}

      {/* Sidebar (Desktop) / Bottom Nav (Mobile) */}
      <nav className="flex-shrink-0 md:w-24 md:h-full w-full h-20 border-t-2 md:border-t-0 md:border-r-2 border-black flex md:flex-col items-center justify-around md:justify-center z-50 bg-white">
        
        {/* Brand */}
        <div className="hidden md:flex absolute top-6 w-12 h-12 bg-black text-white rounded-lg items-center justify-center mb-auto border-2 border-black">
          <span className="font-bold text-2xl font-mono">N</span>
        </div>

        <div className="flex md:flex-col gap-2 md:gap-8 w-full md:w-auto justify-evenly md:justify-center">
            <NavButton 
                active={currentView === AppView.DASHBOARD} 
                onClick={() => onChangeView(AppView.DASHBOARD)} 
                icon={<Home size={28} strokeWidth={2.5} />} 
                label="HOME" 
            />
            
            <NavButton 
                active={currentView === AppView.CHORES} 
                onClick={() => onChangeView(AppView.CHORES)} 
                icon={<Layers size={28} strokeWidth={2.5} />} 
                label="LISTS" 
            />
            
            <NavButton 
                active={currentView === AppView.CALENDAR} 
                onClick={() => onChangeView(AppView.CALENDAR)} 
                icon={<CalendarDays size={28} strokeWidth={2.5} />} 
                label="PLAN" 
            />
        </div>

        {/* Screensaver Toggle */}
        <div className="hidden md:flex absolute bottom-6">
            <button 
                onClick={() => setScreensaver(true)}
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-transparent active:border-black active:bg-black active:text-white text-black"
                title="Sleep Mode"
            >
                <Moon size={24} />
            </button>
        </div>

      </nav>

      {/* Main Content Area - constrained to viewport */}
      <main className="flex-1 h-full overflow-hidden relative p-4 md:p-6 bg-white">
        {children}
      </main>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`relative p-4 md:p-4 rounded-xl group flex flex-col items-center gap-1 border-2
            ${active 
                ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] translate-x-[-2px] translate-y-[-2px]' 
                : 'bg-white text-black border-transparent active:border-black'}`}
    >
        <div className="relative z-10">{icon}</div>
        <span className={`text-[10px] font-bold tracking-widest ${active ? 'text-white' : 'text-black'}`}>{label}</span>
    </button>
);