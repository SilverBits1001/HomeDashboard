import React from 'react';
import { useHome } from '../../context/HomeContext';
import { Cloud, CloudRain, Sun, CloudLightning, CloudSnow, Droplets, Wind, ArrowRight } from 'lucide-react';

const getWeatherIcon = (condition: string, size: number = 24) => {
  const props = { size, strokeWidth: 2 };
  switch (condition) {
    case 'Sunny': return <Sun {...props} />;
    case 'Rainy': return <CloudRain {...props} />;
    case 'Stormy': return <CloudLightning {...props} />;
    case 'Snowy': return <CloudSnow {...props} />;
    default: return <Cloud {...props} />;
  }
};

export const WeatherWidget: React.FC = () => {
  const { weather } = useHome();

  return (
    <div className="h-full flex flex-col bg-white p-4 justify-between relative">
        {/* Header */}
        <div>
            <div className="flex justify-between items-start">
                <h3 className="font-black uppercase tracking-wider text-lg border-b-2 border-black">Outside</h3>
                <div className="text-xs font-mono border border-black px-1 font-bold">LIVE</div>
            </div>

            {/* Main Temp */}
            <div className="flex flex-col items-center justify-center mt-6 mb-4">
                {getWeatherIcon(weather.condition, 64)}
                <div className="text-7xl font-black mt-4 tracking-tighter">{Math.round(weather.temp)}°</div>
                <div className="font-mono text-lg uppercase tracking-widest">{weather.condition}</div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t-2 border-black pt-4 mb-8">
                <div className="flex items-center gap-2">
                    <Wind size={16} /> 
                    <span className="font-bold">{weather.windSpeed} MPH</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                    <Droplets size={16} /> 
                    <span className="font-bold">{weather.humidity}%</span>
                </div>
            </div>
        </div>

        {/* Forecast List */}
        <div className="space-y-3">
            <div className="text-xs font-bold uppercase text-black border-b border-black inline-block">Forecast</div>
            {weather.forecast.map((day, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-black pb-2 last:border-0">
                    <span className="font-mono font-bold w-12">{day.day}</span>
                    <div className="flex items-center gap-2">
                         {getWeatherIcon(weather.condition === 'Sunny' ? 'Sunny' : 'Cloudy', 16)}
                         <span className="font-bold text-lg">{day.temp}°</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};