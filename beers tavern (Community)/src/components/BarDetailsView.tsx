import { Star, MapPin, Clock, Phone, DollarSign, X, ArrowLeft, Navigation as NavigationIcon, Edit2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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

interface BarDetailsViewProps {
  bar: Bar | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
}

const imageMap: Record<string, string> = {
  'craft-beer-bar': 'https://images.unsplash.com/photo-1649798584143-11549c12a7ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBiYXJ8ZW58MXx8fHwxNzYxNTgxNTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'modern-bar': 'https://images.unsplash.com/photo-1760982192590-de2b005bb4d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE1Nzk0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'tavern-interior': 'https://images.unsplash.com/photo-1656758073866-e12c8d8de36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXZlcm4lMjBwdWJ8ZW58MXx8fHwxNzYxNTgxNTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'brewery-pub': 'https://images.unsplash.com/photo-1721412181600-0d05cb6c46d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmV3ZXJ5JTIwcHVifGVufDF8fHx8MTc2MTU4MTU0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  'traditional-bar': 'https://images.unsplash.com/photo-1578174532946-fa6e6d86c763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGJhcnxlbnwxfHx8fDE3NjE1ODE1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

export function BarDetailsView({ bar, isOpen, onClose, onEdit }: BarDetailsViewProps) {
  if (!bar || !isOpen) return null;

  return (
    <>
      {/* Desktop - Dialog Style */}
      <div className="hidden md:block">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
          onClick={onClose}
        />
        
        {/* Dialog */}
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#242424] border border-gray-700 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
          {/* Close & Edit buttons */}
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 bg-amber-500 hover:bg-amber-600 text-black rounded-full transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-80 bg-gray-700">
            <ImageWithFallback
              src={imageMap[bar.image]}
              alt={bar.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242424] via-transparent to-transparent" />
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-4xl text-white mb-2">{bar.name}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
                  <span className="text-2xl text-white">{bar.rating}</span>
                  <span className="text-gray-300">({bar.reviewCount} avis)</span>
                </div>
                <Badge className={bar.isOpen ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                  <Clock className="w-4 h-4 mr-1" />
                  {bar.isOpen ? 'Ouvert maintenant' : 'Fermé'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Specialty */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <p className="text-amber-400 text-lg">
                <span className="opacity-70">Spécialité:</span> {bar.specialty}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-5 bg-[#1a1a1a] rounded-lg border border-gray-800">
                <MapPin className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 mb-1">Adresse</p>
                  <p className="text-white text-lg">{bar.address}</p>
                  <p className="text-gray-500 mt-1">À {bar.distance}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5 bg-[#1a1a1a] rounded-lg border border-gray-800">
                <Phone className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 mb-1">Téléphone</p>
                  <p className="text-white text-lg">+33 1 42 XX XX XX</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5 bg-[#1a1a1a] rounded-lg border border-gray-800">
                <Clock className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 mb-1">Horaires</p>
                  <p className="text-white text-lg">17h00 - 02h00</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5 bg-[#1a1a1a] rounded-lg border border-gray-800">
                <DollarSign className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 mb-1">Prix moyen</p>
                  <p className="text-white text-lg">6€ - 12€</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 mb-6">
              <h3 className="text-xl text-gray-300">À propos</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Un lieu convivial proposant une large sélection de {bar.specialty.toLowerCase()}. 
                Ambiance chaleureuse et personnel accueillant. Parfait pour une soirée entre amis 
                ou pour découvrir de nouvelles saveurs.
              </p>
            </div>

            {/* Popular Times */}
            <div className="space-y-3 mb-6">
              <h3 className="text-xl text-gray-300">Affluence typique</h3>
              <div className="flex items-end gap-3 h-32">
                {[40, 60, 85, 95, 75, 50, 30].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-amber-500/20 rounded-t relative overflow-hidden" style={{ height: `${height}%` }}>
                      <div className="absolute inset-0 bg-amber-500/50" />
                    </div>
                    <span className="text-sm text-gray-400">{18 + index}h</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-black text-lg py-6">
                <MapPin className="w-5 h-5 mr-2" />
                Itinéraire
              </Button>
              <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-[#2a2a2a] text-lg py-6">
                <Phone className="w-5 h-5 mr-2" />
                Appeler
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile - Full Page */}
      <div className="md:hidden fixed inset-0 z-50 bg-[#1a1a1a] animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#242424] border-b border-gray-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-white flex-1 truncate">{bar.name}</h2>
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 bg-amber-500 hover:bg-amber-600 text-black rounded-full transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-full pb-32">
          {/* Hero Image */}
          <div className="relative w-full h-64 bg-gray-700">
            <ImageWithFallback
              src={imageMap[bar.image]}
              alt={bar.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 space-y-4">
            {/* Rating & Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span className="text-xl text-white">{bar.rating}</span>
                <span className="text-gray-400">({bar.reviewCount})</span>
              </div>
              <Badge className={bar.isOpen ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                <Clock className="w-3.5 h-3.5 mr-1" />
                {bar.isOpen ? 'Ouvert' : 'Fermé'}
              </Badge>
            </div>

            {/* Specialty */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
              <p className="text-amber-400">
                <span className="opacity-70">Spécialité:</span> {bar.specialty}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-[#242424] rounded-lg border border-gray-800">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-sm mb-1">Adresse</p>
                  <p className="text-white">{bar.address}</p>
                  <p className="text-gray-500 text-sm mt-1">À {bar.distance}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#242424] rounded-lg border border-gray-800">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm mb-1">Téléphone</p>
                  <p className="text-white">+33 1 42 XX XX XX</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-4 bg-[#242424] rounded-lg border border-gray-800">
                  <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Horaires</p>
                    <p className="text-white">17h - 02h</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#242424] rounded-lg border border-gray-800">
                  <DollarSign className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Prix</p>
                    <p className="text-white">6€ - 12€</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-gray-300">À propos</h3>
              <p className="text-gray-400 leading-relaxed">
                Un lieu convivial proposant une large sélection de {bar.specialty.toLowerCase()}. 
                Ambiance chaleureuse et personnel accueillant. Parfait pour une soirée entre amis 
                ou pour découvrir de nouvelles saveurs.
              </p>
            </div>

            {/* Popular Times */}
            <div className="space-y-3">
              <h3 className="text-gray-300">Affluence typique</h3>
              <div className="flex items-end gap-2 h-24">
                {[40, 60, 85, 95, 75, 50, 30].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-amber-500/20 rounded-t relative overflow-hidden" style={{ height: `${height}%` }}>
                      <div className="absolute inset-0 bg-amber-500/50" />
                    </div>
                    <span className="text-xs text-gray-500">{18 + index}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#242424] border-t border-gray-800 p-4 space-y-2">
          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6">
            <NavigationIcon className="w-5 h-5 mr-2" />
            Itinéraire
          </Button>
          <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-[#2a2a2a] py-6">
            <Phone className="w-5 h-5 mr-2" />
            Appeler
          </Button>
        </div>
      </div>
    </>
  );
}
