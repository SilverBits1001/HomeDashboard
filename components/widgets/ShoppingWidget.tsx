import React from 'react';
import { useHome } from '../../context/HomeContext';
import { ShoppingCart, Plus, X } from 'lucide-react';

export const ShoppingWidget: React.FC = () => {
  const { shoppingList, toggleShoppingItem, addShoppingItem } = useHome();
  const [newValue, setNewValue] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(newValue.trim()){
        addShoppingItem(newValue.trim());
        setNewValue('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 overflow-hidden">
       <div className="flex justify-between items-center mb-4 flex-shrink-0">
           <div className="flex items-center gap-2">
               <ShoppingCart className="text-black" size={24} />
               <h3 className="font-black uppercase tracking-wider text-2xl">Shopping</h3>
           </div>
           <span className="font-mono text-sm border-2 border-black px-2 rounded-full">
               {shoppingList.filter(i => !i.checked).length}
           </span>
       </div>

       <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 mb-3 border-t-2 border-b-2 border-black py-2">
           {shoppingList.map(item => (
                <button
                    key={item.id}
                    onClick={() => toggleShoppingItem(item.id)}
                    className={`w-full flex items-center justify-between p-2 border-2 rounded-lg transition-all
                        ${item.checked 
                            ? 'border-black border-dashed bg-white text-black' 
                            : 'border-black text-black bg-white active:bg-black active:text-white'}`}
                >
                    <span className={`text-lg font-bold ${item.checked ? 'line-through decoration-2' : ''}`}>
                        {item.name}
                    </span>
                    <div className={`w-5 h-5 border-2 flex items-center justify-center border-black`}>
                        {item.checked && <X size={16} />}
                    </div>
                </button>
           ))}
       </div>

       <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0">
            <input 
                type="text" 
                placeholder="ADD ITEM..." 
                className="flex-1 bg-white border-2 border-black rounded-lg py-2 px-3 text-sm font-bold placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black uppercase"
                value={newValue}
                onChange={e => setNewValue(e.target.value)}
            />
            <button type="submit" className="bg-black text-white p-2 rounded-lg border-2 border-black hover:bg-white hover:text-black transition-colors">
                <Plus size={20} />
            </button>
       </form>
    </div>
  );
};