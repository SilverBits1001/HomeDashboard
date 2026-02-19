import React from 'react';
import { useHome } from '../../context/HomeContext';
import { Lightbulb, Lock, Thermometer, Video, Power, LockOpen, Plus, Minus, Fan, Snowflake, Wind, Play, Home as HomeIcon, Battery, LayoutGrid, MapPin } from 'lucide-react';

export const DeviceControlWidget: React.FC = () => {
  const { devices, toggleDevice, setDeviceValue, setDeviceMode, setDeviceFanSpeed, setDeviceTask } = useHome();

  const getIcon = (type: string, isOn: boolean) => {
    const props = { size: 24, strokeWidth: 2.5 };
    switch (type) {
      case 'light': return <Lightbulb {...props} />;
      case 'lock': return isOn ? <LockOpen {...props} /> : <Lock {...props} />;
      case 'thermostat': return <Thermometer {...props} />;
      case 'camera': return <Video {...props} />;
      default: return <Power {...props} />;
    }
  };

  const lights = devices.filter(d => d.type === 'light');
  const climate = devices.filter(d => d.type === 'thermostat');
  const vacuums = devices.filter(d => d.type === 'vacuum');

  return (
    <div className="h-full flex flex-col bg-white p-4">
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
          <h3 className="font-black uppercase tracking-wider text-lg border-b-2 border-black inline-block">Controls</h3>
          <span className="font-mono text-xs font-bold border border-black px-2 py-1 rounded-md">
              {devices.filter(d => d.isOn || (d.mode && d.mode !== 'off')).length} ACTIVE
          </span>
      </div>
      
      {/* Container flexes to fill height, no scrolling */}
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        
        {/* Lights Section - Fixed Height row */}
        {lights.length > 0 && (
           <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {lights.map(device => (
                <button
                    key={device.id}
                    onClick={() => toggleDevice(device.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left
                        ${device.isOn 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
                >
                    <div className="flex-shrink-0">
                        {getIcon(device.type, device.isOn)}
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold text-sm leading-tight truncate">{device.name}</div>
                        <div className="text-[10px] font-mono opacity-80 uppercase">
                            {device.isOn ? 'ON' : 'OFF'}
                        </div>
                    </div>
                </button>
            ))}
           </div>
        )}

        {/* Climate Section - Flexes to take available space */}
        {climate.map(device => (
            <div key={device.id} className="border-2 border-black rounded-lg p-3 flex flex-col justify-between flex-1 min-h-0 gap-2">
                {/* Header */}
                <div className="flex items-center gap-2 border-b-2 border-black pb-1 flex-shrink-0">
                    <Thermometer size={18} strokeWidth={2.5} />
                    <span className="font-bold text-sm uppercase">{device.name}</span>
                </div>

                {/* Main Controls Row */}
                <div className="flex-1 flex flex-col justify-center min-h-0">
                    <div className="flex items-center justify-between">
                        {/* Temperature Control */}
                        <div className="flex items-center gap-3">
                             <button 
                                className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors disabled:opacity-20"
                                onClick={() => device.value && setDeviceValue(device.id, device.value - 1)}
                                disabled={device.mode === 'off' || device.mode === 'fan'}
                            ><Minus size={18} strokeWidth={3} /></button>
                            
                            <div className={`w-14 text-center font-mono font-bold text-4xl tracking-tighter ${device.mode === 'off' ? 'opacity-30' : ''}`}>
                                 {device.value}°
                            </div>
                            
                            <button 
                                 className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors disabled:opacity-20"
                                 onClick={() => device.value && setDeviceValue(device.id, device.value + 1)}
                                 disabled={device.mode === 'off' || device.mode === 'fan'}
                            ><Plus size={18} strokeWidth={3} /></button>
                        </div>

                        {/* Mode Display */}
                        <div className="text-right">
                            <div className="text-[10px] font-mono font-bold uppercase text-gray-500">STATUS</div>
                            <div className="font-black text-xl uppercase">{device.mode}</div>
                        </div>
                    </div>
                </div>

                {/* Controls Footer - Compact */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                    <div className="grid grid-cols-3 gap-2">
                        {['off', 'fan', 'cool'].map((m) => (
                            <button
                                key={m}
                                onClick={() => setDeviceMode(device.id, m as any)}
                                className={`py-2 text-[10px] font-bold uppercase rounded border-2 transition-colors flex items-center justify-center gap-1
                                    ${device.mode === m 
                                        ? 'bg-black text-white border-black' 
                                        : 'bg-white text-black border-black hover:bg-gray-100'}`}
                            >
                                {m === 'cool' && <Snowflake size={12} />}
                                {m === 'fan' && <Fan size={12} />}
                                {m === 'off' && <Power size={12} />}
                                {m}
                            </button>
                        ))}
                    </div>

                    <div className={`grid grid-cols-3 gap-2 transition-opacity duration-200 ${device.mode === 'off' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                        {['auto', 'low', 'high'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setDeviceFanSpeed(device.id, s as any)}
                                className={`py-1.5 text-[10px] font-bold uppercase rounded border-2 transition-colors flex items-center justify-center gap-1
                                    ${device.fanSpeed === s 
                                        ? 'bg-black text-white border-black' 
                                        : 'bg-white text-black border-gray-300 text-gray-500 hover:border-black hover:text-black'}`}
                            >
                                <Wind size={10} />
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        ))}

        {/* Vacuum Section - Flexes to take available space */}
        {vacuums.map(device => (
             <div key={device.id} className="border-2 border-black rounded-lg p-3 flex flex-col justify-between flex-1 min-h-0 gap-2">
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-1 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <span className={`transition-all ${device.isOn ? 'text-black' : 'text-gray-400'}`}>
                             {device.isOn ? <Play size={18} fill="currentColor" strokeWidth={0} /> : <HomeIcon size={18} />}
                        </span>
                        <span className="font-bold text-sm uppercase">{device.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono font-bold">
                        <Battery size={14} />
                        <span>{device.batteryLevel}%</span>
                    </div>
                </div>

                {/* Status Big Text */}
                <div className="flex-1 flex flex-col justify-center items-center min-h-0">
                     <div className="text-2xl font-black uppercase tracking-wider text-center leading-none">
                         {device.isOn ? 'RUNNING' : 'DOCKED'}
                     </div>
                     <div className="text-[10px] font-mono text-gray-500 uppercase mt-1">
                         {device.isOn ? `${device.currentTask}` : 'Ready'}
                     </div>
                </div>

                {/* Controls - Compact Grid */}
                {!device.isOn ? (
                    <div className="grid grid-cols-2 gap-2 mt-auto flex-shrink-0">
                        {['Whole Home', 'Living Room', 'Kitchen', 'Bedroom'].map(area => (
                            <button
                                key={area}
                                onClick={() => {
                                    setDeviceTask(device.id, area);
                                    if (!device.isOn) toggleDevice(device.id);
                                }}
                                className="py-2 text-[10px] font-bold uppercase rounded border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-1 bg-white text-black"
                            >
                                {area === 'Whole Home' ? <LayoutGrid size={12} /> : <MapPin size={12} />}
                                {area.split(' ')[0]}
                            </button>
                        ))}
                    </div>
                ) : (
                    <button
                        onClick={() => device.isOn && toggleDevice(device.id)}
                        className="py-3 w-full text-xs font-bold uppercase rounded border-2 transition-colors flex items-center justify-center gap-2 bg-white text-black border-black hover:bg-gray-100 flex-shrink-0 mt-auto"
                    >
                        <HomeIcon size={14} /> RETURN TO DOCK
                    </button>
                )}
            </div>
        ))}
      </div>
    </div>
  );
};