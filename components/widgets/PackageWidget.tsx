import React from 'react';
import { useHome } from '../../context/HomeContext';
import { Package as PackageIcon, Truck } from 'lucide-react';

export const PackageWidget: React.FC = () => {
  const { packages } = useHome();
  const arrivingToday = packages.filter(p => p.estimatedArrival === 'Today' || p.status === 'Out for Delivery');

  return (
    <div className="h-full flex flex-col bg-white p-4 relative overflow-hidden">
        {/* Decorative background stripe */}
        <div className="absolute top-0 right-0 w-16 h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0tMSwxIGwyLC0yIE0wLDQgbDQsLTQgTTMsNSBsMiwtMiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-10 pointer-events-none border-l-2 border-black" />

        <div className="flex justify-between items-start mb-2 relative z-10">
             <h3 className="font-black uppercase tracking-wider text-lg border-b-2 border-black">Mail</h3>
             <Truck className="text-black" size={20} />
        </div>

        <div className="flex-1 flex flex-col justify-center relative z-10">
            {arrivingToday.length > 0 ? (
                <>
                    <div className="text-5xl font-black">{arrivingToday.length}</div>
                    <div className="text-sm font-bold uppercase leading-none">Arriving<br/>Today</div>
                </>
            ) : (
                <div className="text-center text-gray-500 font-mono text-sm">NO MAIL</div>
            )}
        </div>
        
        {arrivingToday.length > 0 && (
            <div className="mt-2 pt-2 border-t-2 border-black text-xs font-mono truncate relative z-10">
                {arrivingToday[0].carrier}: {arrivingToday[0].description}
            </div>
        )}
    </div>
  );
};