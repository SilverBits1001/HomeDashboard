import React, { useRef } from 'react';
import { useHome } from '../../context/HomeContext';
import { PenTool } from 'lucide-react';

export const NotesWidget: React.FC = () => {
  const { note, setNote } = useHome();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="h-full flex flex-col bg-white p-4 relative group">
       {/* Visual 'Paper' effect lines */}
       <div className="absolute inset-0 pointer-events-none opacity-10" 
            style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '4rem' }} 
       />

       <div className="flex justify-between items-center mb-2 border-b-2 border-black pb-2 bg-white z-10">
           <h3 className="font-black uppercase tracking-wider text-2xl">Family Note</h3>
           <PenTool size={20} />
       </div>

       <div className="flex-1 relative">
           <textarea
                ref={textareaRef}
                className="w-full h-full resize-none bg-transparent focus:outline-none font-mono text-lg leading-8 p-1"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type a note..."
           />
           {/* Edit hint */}
           <div className="absolute bottom-2 right-2 text-[10px] font-bold uppercase bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               Tap to edit
           </div>
       </div>
    </div>
  );
};