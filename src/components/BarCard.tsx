import { Star, MapPin, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface BarCardProps {
  bar: Bar;
  isSelected: boolean;
  onClick: () => void;
  isMobile?: boolean;
}

const imageMap: Record<string, string> = {
  'craft-beer-bar': 'https://images.unsplash.com/photo-1649798584143-11549c12a7ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBiYXJ8ZW58MXx8fHwxNzYxNTgxNTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'modern-bar': 'https://images.unsplash.com/photo-1760982192590-de2b005bb4d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE1Nzk0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'tavern-interior': 'https://images.unsplash.com/photo-1656758073866-e12c8d8de36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXZlcm4lMjBwdWJ8ZW58MXx8fHwxNzYxNTgxNTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'brewery-pub': 'https://images.unsplash.com/photo-1721412181600-0d05cb6c46d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmV3ZXJ5JTIwcHVifGVufDF8fHx8MTc2MTU4MTU0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  'traditional-bar': 'https://images.unsplash.com/photo-1578174532946-fa6e6d86c763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGJhcnxlbnwxfHx8fDE3NjE1ODE1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

export function BarCard({ bar, isSelected, onClick, isMobile = false }: BarCardProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 ${
        isMobile ? 'p-3' : 'p-4 border-b border-gray-800'
      } ${
        isSelected
          ? 'bg-amber-500/10 border-l-4 border-l-amber-500'
          : 'hover:bg-[#2a2a2a]'
      }`}
    >
      <div className="flex gap-3">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className={`${isMobile ? 'w-20 h-20' : 'w-24 h-24'} rounded-lg overflow-hidden bg-gray-700`}>
            <ImageWithFallback
              src={imageMap[bar.image]}
              alt={bar.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-white truncate">{bar.name}</h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-white">{bar.rating}</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-2 truncate">{bar.specialty}</p>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{bar.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span className={bar.isOpen ? 'text-green-400' : 'text-red-400'}>
                {bar.isOpen ? 'Ouvert' : 'Fermé'}
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-xs mt-1 truncate">{bar.address}</p>
        </div>
      </div>
    </div>
  );
}
