import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Sparkles, X } from 'lucide-react';
import { parseNaturalLanguageCommand } from '../services/geminiService';
import { useHome } from '../context/HomeContext';

export const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const { devices, toggleDevice, setDeviceValue, addChore, addShoppingItem } = useHome();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = async () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setResponseMsg(null);

    const result = await parseNaturalLanguageCommand(input, devices);
    
    // Execute Action
    let feedback = "I couldn't understand that.";
    
    if (result.action === 'TOGGLE_DEVICE' && result.targetId) {
      const device = devices.find(d => d.id === result.targetId);
      if (device) {
          const targetState = result.value === true;
          if (typeof result.value === 'boolean') {
             if (device.isOn !== targetState) {
                 toggleDevice(device.id);
                 feedback = `Turned ${targetState ? 'ON' : 'OFF'} ${device.name}.`;
             } else {
                 feedback = `${device.name} is already ${targetState ? 'ON' : 'OFF'}.`;
             }
          } else {
              toggleDevice(device.id);
              feedback = `Toggled ${device.name}.`;
          }
      }
    } else if (result.action === 'SET_VALUE' && result.targetId && typeof result.value === 'number') {
      setDeviceValue(result.targetId, result.value);
      feedback = `Set ${result.targetName || 'device'} to ${result.value}.`;
    } else if (result.action === 'ADD_CHORE' && result.targetName) {
      addChore(result.targetName);
      feedback = `Added chore: ${result.targetName}.`;
    } else if (result.action === 'ADD_SHOPPING' && result.targetName) {
      addShoppingItem(result.targetName);
      feedback = `Added ${result.targetName} to list.`;
    } else if (result.action === 'UNKNOWN') {
      feedback = "Command not recognized.";
    }

    setResponseMsg(feedback);
    setIsProcessing(false);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCommand();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-black text-white rounded-full shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-2 border-white md:border-black md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform z-50"
      >
        <Sparkles size={24} />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black rounded-2xl w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
            
            {/* Header */}
            <div className="p-4 border-b-2 border-black flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-black fill-black" />
                <span className="font-black text-lg uppercase">Nexus AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-black hover:bg-black hover:text-white rounded-md p-1 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {responseMsg && (
                <div className="bg-black text-white p-4 rounded-lg text-sm font-mono border-2 border-black">
                  > {responseMsg}
                </div>
              )}
              
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="TYPE COMMAND..."
                  className="w-full bg-white border-2 border-black rounded-xl py-4 pl-4 pr-12 text-black font-bold focus:outline-none focus:ring-2 focus:ring-black transition-all uppercase placeholder-gray-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isProcessing}
                />
                <button 
                  onClick={handleCommand}
                  disabled={isProcessing || !input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:scale-110 disabled:opacity-30 transition-transform"
                >
                  {isProcessing ? <div className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin" /> : <Send size={24} strokeWidth={2.5} />}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider py-1">Examples:</span>
                {['Lights OFF', 'Add Milk', 'Temp 72'].map(hint => (
                  <button 
                    key={hint}
                    onClick={() => setInput(hint)}
                    className="text-xs border border-black px-2 py-1 rounded-md hover:bg-black hover:text-white transition-colors font-mono uppercase"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};