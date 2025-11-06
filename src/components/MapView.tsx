import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface Bar {
  id: number;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  distance: string;
  lat: number;
  lng: number;
  image: string;
  isOpen: boolean;
}

interface MapViewProps {
  bars: Bar[];
  selectedBarId: number | null;
  onSelectBar: (id: number) => void;
}

export function MapView({ bars, selectedBarId, onSelectBar }: MapViewProps) {
  const [userLocation] = useState({ lat: 48.8566, lng: 2.3522 });
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mapRef} className="w-full h-full relative bg-[#1a1a1a]">
      {/* Map Background - Real map image style Google Maps */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1732112548595-c2a8fdff796b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBtYXAlMjBkYXJrJTIwbmlnaHR8ZW58MXx8fHwxNzYxNTgyMjUxfDA&ixlib=rb-4.1.0&q=80&w=1080)',
          }}
        />
        {/* Dark overlay for better contrast and Google Maps dark style */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/70 via-[#0a0a0a]/60 to-[#1a1a1a]/70" />

        {/* Bar markers */}
        {bars.map((bar, index) => {
          const xPos = 20 + (index * 15) % 60;
          const yPos = 20 + (index * 20) % 60;
          const isSelected = selectedBarId === bar.id;

          return (
            <div
              key={bar.id}
              onClick={() => onSelectBar(bar.id)}
              className={`absolute cursor-pointer transition-all duration-300 ${
                isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110'
              }`}
              style={{
                left: `${xPos}%`,
                top: `${yPos}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              {/* Pin */}
              <div className="relative">
                <div
                  className={`rounded-full p-2.5 shadow-lg transition-all ${
                    isSelected
                      ? 'bg-amber-500 animate-bounce'
                      : bar.isOpen
                      ? 'bg-amber-500/90'
                      : 'bg-gray-500/90'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-white fill-current" />
                </div>
                
                {/* Pulse effect for selected */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-75" />
                )}

                {/* Label on hover or selected */}
                <div
                  className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap transition-all ${
                    isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                  }`}
                >
                  <div className="bg-gray-900 text-white px-3 py-1.5 rounded-lg shadow-xl border border-gray-700 text-sm">
                    {bar.name}
                  </div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900 mx-auto" />
                </div>
              </div>
            </div>
          );
        })}

        {/* User location */}
        <div
          className="absolute z-30"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-40">
        <button className="bg-[#242424] hover:bg-[#2a2a2a] text-white p-3 rounded-lg shadow-lg border border-gray-700 transition-colors">
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 md:bottom-auto md:top-4 right-4 flex flex-col gap-2 z-40">
        <button className="bg-[#242424] hover:bg-[#2a2a2a] text-white w-10 h-10 rounded-lg shadow-lg border border-gray-700 transition-colors flex items-center justify-center">
          <span className="text-xl">+</span>
        </button>
        <button className="bg-[#242424] hover:bg-[#2a2a2a] text-white w-10 h-10 rounded-lg shadow-lg border border-gray-700 transition-colors flex items-center justify-center">
          <span className="text-xl">−</span>
        </button>
      </div>

      {/* Legend */}
      <div className="hidden md:block absolute bottom-4 left-4 bg-[#242424] rounded-lg shadow-lg border border-gray-800 p-3 z-40">
        <div className="flex items-center gap-2 text-sm mb-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full" />
          <span className="text-gray-300">Bar ouvert</span>
        </div>
        <div className="flex items-center gap-2 text-sm mb-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full" />
          <span className="text-gray-300">Bar fermé</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-gray-300">Votre position</span>
        </div>
      </div>
    </div>
  );
}
