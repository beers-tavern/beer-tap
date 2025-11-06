import { useState } from 'react';
import { MapView } from './components/MapView';
import { BarCard } from './components/BarCard';
import { Header } from './components/Header';
import { BarDetailsView } from './components/BarDetailsView';
import { UserProfile } from './components/UserProfile';
import { BarForm } from './components/BarForm';
import { Search, Beer, MapPin, Plus } from 'lucide-react';
import { Button } from './components/ui/button';

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

const mockBars: Bar[] = [
  {
    id: 1,
    name: "Le Comptoir Craft",
    address: "15 rue de la Soif, Paris",
    rating: 4.7,
    reviewCount: 234,
    specialty: "Bières artisanales",
    distance: "0.5 km",
    lat: 48.8566,
    lng: 2.3522,
    image: "craft-beer-bar",
    isOpen: true,
  },
  {
    id: 2,
    name: "The Hoppy Place",
    address: "28 avenue des Houblons, Paris",
    rating: 4.5,
    reviewCount: 189,
    specialty: "IPA & Stouts",
    distance: "1.2 km",
    lat: 48.8606,
    lng: 2.3376,
    image: "modern-bar",
    isOpen: true,
  },
  {
    id: 3,
    name: "La Taverne du Malt",
    address: "42 boulevard du Breuvage, Paris",
    rating: 4.8,
    reviewCount: 312,
    specialty: "Bières belges",
    distance: "0.8 km",
    lat: 48.8529,
    lng: 2.3499,
    image: "tavern-interior",
    isOpen: false,
  },
  {
    id: 4,
    name: "Brew Station",
    address: "7 place de la Bière, Paris",
    rating: 4.6,
    reviewCount: 267,
    specialty: "Microbrasserie",
    distance: "1.5 km",
    lat: 48.8584,
    lng: 2.3447,
    image: "brewery-pub",
    isOpen: true,
  },
  {
    id: 5,
    name: "Le Zinc Doré",
    address: "33 rue des Tonneaux, Paris",
    rating: 4.4,
    reviewCount: 156,
    specialty: "Bar traditionnel",
    distance: "2.1 km",
    lat: 48.8543,
    lng: 2.3601,
    image: "traditional-bar",
    isOpen: true,
  },
];

export default function App() {
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateBarOpen, setIsCreateBarOpen] = useState(false);
  const [isEditBarOpen, setIsEditBarOpen] = useState(false);
  const [bars, setBars] = useState<Bar[]>(mockBars);

  const filteredBars = bars.filter(bar =>
    bar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bar.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBarClick = (barId: number) => {
    setSelectedBar(barId);
    setIsDetailsOpen(true);
  };

  const handleSaveBar = (barData: Partial<Bar>) => {
    if (selectedBar && isEditBarOpen) {
      // Edit existing bar
      setBars(bars.map(bar => 
        bar.id === selectedBar ? { ...bar, ...barData } : bar
      ));
    } else {
      // Create new bar
      const newBar: Bar = {
        id: bars.length + 1,
        name: barData.name || '',
        address: barData.address || '',
        rating: 4.5,
        reviewCount: 0,
        specialty: barData.specialty || '',
        distance: '0.5 km',
        lat: 48.8566,
        lng: 2.3522,
        image: 'craft-beer-bar',
        isOpen: barData.isOpen ?? true,
      };
      setBars([...bars, newBar]);
    }
  };

  const handleEditBar = () => {
    setIsDetailsOpen(false);
    setIsEditBarOpen(true);
  };

  const selectedBarData = bars.find(bar => bar.id === selectedBar);

  return (
    <div className="h-screen w-full bg-[#1a1a1a] flex flex-col overflow-hidden">
      <Header 
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenCreateBar={() => setIsCreateBarOpen(true)}
      />
      
      {/* Mobile Search */}
      <div className="md:hidden px-4 py-3 bg-[#242424] border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un bar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar - Desktop only */}
        <div className="hidden md:flex md:w-[400px] lg:w-[450px] flex-col bg-[#242424] border-r border-gray-800">
          {/* Search */}
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un bar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white pl-11 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Results count */}
          <div className="px-4 py-3 border-b border-gray-800">
            <p className="text-gray-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{filteredBars.length} bars trouvés</span>
            </p>
          </div>

          {/* Bar List */}
          <div className="flex-1 overflow-y-auto">
            {filteredBars.map((bar) => (
              <BarCard
                key={bar.id}
                bar={bar}
                isSelected={selectedBar === bar.id}
                onClick={() => handleBarClick(bar.id)}
              />
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapView bars={filteredBars} selectedBarId={selectedBar} onSelectBar={handleBarClick} />
        </div>

        {/* Mobile Bottom Sheet */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#242424] border-t border-gray-800 max-h-[40vh] overflow-y-auto z-10">
          <div className="p-3 border-b border-gray-800 sticky top-0 bg-[#242424] z-10">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{filteredBars.length} bars trouvés</span>
              </p>
              <Button
                size="sm"
                onClick={() => setIsCreateBarOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-black gap-1.5 h-8"
              >
                <Plus className="w-4 h-4" />
                Créer
              </Button>
            </div>
          </div>
          <div className="divide-y divide-gray-800">
            {filteredBars.map((bar) => (
              <BarCard
                key={bar.id}
                bar={bar}
                isSelected={selectedBar === bar.id}
                onClick={() => handleBarClick(bar.id)}
                isMobile
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bar Details View */}
      <BarDetailsView
        bar={selectedBarData || null}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onEdit={handleEditBar}
      />

      {/* User Profile */}
      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Create Bar Form */}
      <BarForm
        isOpen={isCreateBarOpen}
        onClose={() => setIsCreateBarOpen(false)}
        onSave={handleSaveBar}
      />

      {/* Edit Bar Form */}
      <BarForm
        bar={selectedBarData}
        isOpen={isEditBarOpen}
        onClose={() => setIsEditBarOpen(false)}
        onSave={handleSaveBar}
      />
    </div>
  );
}
