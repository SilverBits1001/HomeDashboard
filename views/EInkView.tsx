import React from 'react';
import { useHome } from '../context/HomeContext';
import { Cloud, Calendar, CheckSquare, ShoppingCart } from 'lucide-react';

export const EInkView: React.FC = () => {
  const { weather, chores, shoppingList } = useHome();
  const now = new Date();

  return (
    <div className="bg-white min-h-screen text-black font-mono p-8 selection:bg-black selection:text-white">
      {/* E-Ink Header */}
      <header className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-bold tracking-tighter uppercase">Nexus</h1>
          <div className="text-2xl mt-2 font-bold">{now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</div>
        </div>
        <div className="text-right">
             <div className="text-5xl font-bold">{weather.temp}°</div>
             <div className="flex items-center justify-end gap-2 mt-1">
                <Cloud size={24} className="stroke-[3]" />
                <span className="text-xl uppercase">{weather.condition}</span>
             </div>
        </div>
      </header>

      {/* E-Ink Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         
         {/* Chores Column */}
         <section>
            <div className="flex items-center gap-3 border-b-2 border-black pb-2 mb-4">
                <CheckSquare size={32} className="stroke-[3]" />
                <h2 className="text-3xl font-bold uppercase">Chores</h2>
            </div>
            <ul className="space-y-4">
                {chores.filter(c => !c.completed).slice(0, 5).map(c => (
                    <li key={c.id} className="flex items-start gap-4">
                        <div className="w-6 h-6 border-2 border-black mt-1 flex-shrink-0" />
                        <div>
                            <div className="text-2xl leading-none font-bold">{c.title}</div>
                            <div className="text-lg text-gray-600">{c.assignee}</div>
                        </div>
                    </li>
                ))}
                {chores.filter(c => !c.completed).length === 0 && (
                    <li className="text-xl italic">No pending chores. Relax.</li>
                )}
            </ul>
         </section>

         {/* Shopping Column */}
         <section>
            <div className="flex items-center gap-3 border-b-2 border-black pb-2 mb-4">
                <ShoppingCart size={32} className="stroke-[3]" />
                <h2 className="text-3xl font-bold uppercase">Buy</h2>
            </div>
            <ul className="space-y-3">
                {shoppingList.filter(i => !i.checked).slice(0, 8).map(item => (
                    <li key={item.id} className="text-2xl font-semibold flex items-center before:content-['•'] before:mr-4 before:text-4xl before:leading-[0]">
                        {item.name}
                    </li>
                ))}
                 {shoppingList.filter(i => !i.checked).length === 0 && (
                    <li className="text-xl italic">Shopping list empty.</li>
                )}
            </ul>
         </section>
      </div>

      <footer className="fixed bottom-4 left-0 w-full text-center text-sm font-bold uppercase opacity-50">
        Refreshed: {now.toLocaleTimeString()}
      </footer>
    </div>
  );
};