import React from 'react';
import { useHome } from '../../context/HomeContext';
import { Square, CheckSquare } from 'lucide-react';

export const ChoresWidget: React.FC = () => {
  const { chores, toggleChore } = useHome();
  // Show only top 3 on dashboard to prevent scroll issues
  const visibleChores = chores.slice(0, 3);

  return (
    <div className="h-full flex flex-col bg-white p-4">
       <div className="flex justify-between items-center mb-3">
           <h3 className="font-black uppercase tracking-wider text-lg border-b-2 border-black">Chores</h3>
           <span className="text-xs font-bold font-mono bg-black text-white px-2 py-0.5 rounded-sm">
               {chores.filter(c => !c.completed).length} LEFT
           </span>
       </div>

       <div className="flex-1 flex flex-col gap-2 overflow-hidden">
           {chores.length === 0 ? (
               <div className="text-center italic mt-4 font-mono">All systems nominal.</div>
           ) : (
               visibleChores.map(chore => (
                   <button 
                    key={chore.id} 
                    onClick={() => toggleChore(chore.id)}
                    className="group flex items-center gap-3 w-full text-left"
                   >
                        <div className="flex-shrink-0">
                            {chore.completed 
                                ? <CheckSquare size={20} className="text-black" /> 
                                : <Square size={20} className="text-black" strokeWidth={2.5} />}
                        </div>
                        
                        <div className="flex-1 min-w-0 border-b border-black pb-1 group-last:border-0">
                            <div className={`font-bold text-sm truncate ${chore.completed ? 'line-through decoration-2' : ''}`}>
                                {chore.title}
                            </div>
                            <div className="text-[10px] font-mono uppercase text-black">
                                {chore.assignee}
                            </div>
                        </div>
                   </button>
               ))
           )}
           {chores.length > 3 && (
               <div className="text-center text-xs font-mono font-bold mt-auto pt-2 border-t-2 border-black border-dashed">
                   + {chores.length - 3} MORE IN LISTS
               </div>
           )}
       </div>
    </div>
  );
};