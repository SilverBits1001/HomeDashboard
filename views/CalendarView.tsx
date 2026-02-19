import React from 'react';
import { CalendarWidget } from '../components/widgets/CalendarWidget';
import { NotesWidget } from '../components/widgets/NotesWidget';

export const CalendarView: React.FC = () => {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CalendarWidget />
        </div>
        <div className="border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white transform md:translate-y-4">
            {/* Offset nicely for a collage look */}
            <NotesWidget />
        </div>
    </div>
  );
};