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
        
        {/* Lights Section */}
        {lights.length > 0 && (
           <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {lights.map(device => (
                <button
                    key={device.id}
                    onClick={() => toggleDevice(device.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left
                        ${device.isOn 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-black hover:border-dashed'
                    }`}
                >
                    <div className="flex-shrink-0">
                        {getIcon(device.type, device.isOn)}
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold text-sm leading-tight truncate">{device.name}</div>
                        <div className="text-[10px] font-mono uppercase">
                            {device.isOn ? 'ON' : 'OFF'}
                        </div>
                    </div>
                </button>
            ))}
           </div>
        )}

        {/* Climate Section */}
        {climate.map(device => (
            <div key={device.id} className="border-2 border-black rounded-lg p-3 flex flex-col justify-between flex-1 min-h-0 gap-2">
                <div className="flex items-center gap-2 border-b-2 border-black pb-1 flex-shrink-0">
                    <Thermometer size={18} strokeWidth={2.5} />
                    <span className="font-bold text-sm uppercase">{device.name}</span>
                </div>

                <div className="flex-1 flex flex-col justify-center min-h-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                             <button 
                                className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full active:bg-black active:text-white disabled:border-dotted disabled:opacity-50"
                                onClick={() => device.value && setDeviceValue(device.id, device.value - 1)}
                                disabled={device.mode === 'off' || device.mode === 'fan'}
                            ><Minus size={18} strokeWidth={3} /></button>
                            
                            <div className={`w-14 text-center font-mono font-bold text-4xl tracking-tighter ${device.mode === 'off' ? 'decoration-dashed line-through decoration-2' : ''}`}>
                                 {device.value}°
                            </div>
                            
                            <button 
                                 className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full active:bg-black active:text-white disabled:border-dotted disabled:opacity-50"
                                 onClick={() => device.value && setDeviceValue(device.id, device.value + 1)}
                                 disabled={device.mode === 'off' || device.mode === 'fan'}
                            ><Plus size={18} strokeWidth={3} /></button>
                        </div>

                        <div className="text-right">
                            <div className="text-[10px] font-mono font-bold uppercase text-black border-b border-black inline-block mb-1">STATUS</div>
                            <div className="font-black text-xl uppercase">{device.mode}</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                    <div className="grid grid-cols-3 gap-2">
                        {['off', 'fan', 'cool'].map((m) => (
                            <button
                                key={m}
                                onClick={() => setDeviceMode(device.id, m as any)}
                                className={`py-2 text-[10px] font-bold uppercase rounded border-2 flex items-center justify-center gap-1
                                    ${device.mode === m 
                                        ? 'bg-black text-white border-black' 
                                        : 'bg-white text-black border-black'}`}
                            >
                                {m === 'cool' && <Snowflake size={12} />}
                                {m === 'fan' && <Fan size={12} />}
                                {m === 'off' && <Power size={12} />}
                                {m}
                            </button>
                        ))}
                    </div>

                    <div className={`grid grid-cols-3 gap-2 ${device.mode === 'off' ? 'opacity-50 pointer-events-none' : ''}`}>
                        {['auto', 'low', 'high'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setDeviceFanSpeed(device.id, s as any)}
                                className={`py-1.5 text-[10px] font-bold uppercase rounded border-2 flex items-center justify-center gap-1
                                    ${device.fanSpeed === s 
                                        ? 'bg-black text-white border-black' 
                                        : 'bg-white text-black border-black border-dashed'}`}
                            >
                                <Wind size={10} />
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        ))}

        {/* Vacuum Section */}
        {vacuums.map(device => (
             <div key={device.id} className="border-2 border-black rounded-lg p-3 flex flex-col justify-between flex-1 min-h-0 gap-2">
                <div className="flex items-center justify-between border-b-2 border-black pb-1 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <span className={`${device.isOn ? 'text-black' : 'text-black'}`}>
                             {device.isOn ? <Play size={18} fill="currentColor" strokeWidth={0} /> : <HomeIcon size={18} />}
                        </span>
                        <span className="font-bold text-sm uppercase">{device.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono font-bold border border-black px-1">
                        <Battery size={14} />
                        <span>{device.batteryLevel}%</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center min-h-0">
                     <div className="text-2xl font-black uppercase tracking-wider text-center leading-none">
                         {device.isOn ? 'RUNNING' : 'DOCKED'}
                     </div>
                     <div className="text-[10px] font-mono text-black uppercase mt-1">
                         {device.isOn ? `${device.currentTask}` : 'Ready'}
                     </div>
                </div>

                {!device.isOn ? (
                    <div className="grid grid-cols-2 gap-2 mt-auto flex-shrink-0">
                        {['Whole Home', 'Living Room', 'Kitchen', 'Bedroom'].map(area => (
                            <button
                                key={area}
                                onClick={() => {
                                    setDeviceTask(device.id, area);
                                    if (!device.isOn) toggleDevice(device.id);
                                }}
                                className="py-2 text-[10px] font-bold uppercase rounded border-2 border-black active:bg-black active:text-white flex items-center justify-center gap-1 bg-white text-black"
                            >
                                {area === 'Whole Home' ? <LayoutGrid size={12} /> : <MapPin size={12} />}
                                {area.split(' ')[0]}
                            </button>
                        ))}
                    </div>
                ) : (
                    <button
                        onClick={() => device.isOn && toggleDevice(device.id)}
                        className="py-3 w-full text-xs font-bold uppercase rounded border-2 flex items-center justify-center gap-2 bg-white text-black border-black flex-shrink-0 mt-auto"
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