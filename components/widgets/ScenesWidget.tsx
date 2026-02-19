import React, { useState } from 'react';
import { Sun, Moon, Film, LogOut, Coffee } from 'lucide-react';

export const ScenesWidget: React.FC = () => {
  const [activeScene, setActiveScene] = useState<string | null>(null);

  const scenes = [
    { id: 'morning', label: 'Morning', icon: <Coffee size={20} /> },
    { id: 'away', label: 'Away', icon: <LogOut size={20} /> },
    { id: 'movie', label: 'Cinema', icon: <Film size={20} /> },
    { id: 'night', label: 'Goodnight', icon: <Moon size={20} /> },
  ];

  const handleScene = (id: string) => {
      setActiveScene(id);
      setTimeout(() => setActiveScene(null), 2000); // Reset after "activation"
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="grid grid-cols-4 gap-3 h-full">
        {scenes.map(scene => (
            <button
                key={scene.id}
                onClick={() => handleScene(scene.id)}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-all duration-200
                    ${activeScene === scene.id 
                        ? 'bg-black text-white border-black scale-95' 
                        : 'bg-white text-black border-black hover:bg-gray-100'}`}
            >
                {scene.icon}
                <span className="text-[10px] font-bold uppercase tracking-wider">{scene.label}</span>
            </button>
        ))}
      </div>
    </div>
  );
};