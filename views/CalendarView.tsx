import React from 'react';
import { CalendarWidget } from '../components/widgets/CalendarWidget';
import { NotesWidget } from '../components/widgets/NotesWidget';

export const CalendarView: React.FC = () => {
  return (
    <div className="h-full flex flex-col gap-4">
        <div className="flex-1 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white min-h-0">
            <CalendarWidget />
        </div>
        <div className="h-1/3 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white min-h-[150px]">
            <NotesWidget />
        </div>
    </div>
  );
};