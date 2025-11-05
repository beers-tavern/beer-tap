import { useState } from 'react';
import { X, Upload, MapPin, Star, Clock, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
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

interface BarFormProps {
  bar?: Bar | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (bar: Partial<Bar>) => void;
}

export function BarForm({ bar, isOpen, onClose, onSave }: BarFormProps) {
  const [formData, setFormData] = useState({
    name: bar?.name || '',
    address: bar?.address || '',
    specialty: bar?.specialty || '',
    description: '',
    phone: '+33 1 42 XX XX XX',
    hours: '17h00 - 02h00',
    priceRange: '6€ - 12€',
    isOpen: bar?.isOpen ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...bar,
      name: formData.name,
      address: formData.address,
      specialty: formData.specialty,
      isOpen: formData.isOpen,
    });
    onClose();
  };

  if (!isOpen) return null;

  const isEdit = !!bar;

  return (
    <>
      {/* Desktop - Dialog */}
      <div className="hidden md:block">
        <div 
          className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
          onClick={onClose}
        />
        
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#242424] border border-gray-700 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="sticky top-0 bg-[#242424] border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl text-white">
              {isEdit ? 'Modifier le bar' : 'Créer un nouveau bar'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <Label className="text-gray-300 mb-2 block">Photo du bar</Label>
              <div className="w-full h-48 bg-[#1a1a1a] border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center hover:border-amber-500 transition-colors cursor-pointer group">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-600 group-hover:text-amber-500 mx-auto mb-2 transition-colors" />
                  <p className="text-gray-400 text-sm">Cliquez pour ajouter une photo</p>
                  <p className="text-gray-600 text-xs mt-1">PNG, JPG jusqu'à 10MB</p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-gray-300 mb-2 block">
                Nom du bar *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Le Comptoir Craft"
                required
                className="bg-[#1a1a1a] border-gray-700 text-white"
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-gray-300 mb-2 block">
                Adresse *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="15 rue de la Soif, Paris"
                  required
                  className="bg-[#1a1a1a] border-gray-700 text-white pl-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Specialty */}
              <div>
                <Label htmlFor="specialty" className="text-gray-300 mb-2 block">
                  Spécialité *
                </Label>
                <Input
                  id="specialty"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  placeholder="Ex: Bières artisanales"
                  required
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-gray-300 mb-2 block">
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+33 1 42 XX XX XX"
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Hours */}
              <div>
                <Label htmlFor="hours" className="text-gray-300 mb-2 block">
                  Horaires
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    id="hours"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    placeholder="17h00 - 02h00"
                    className="bg-[#1a1a1a] border-gray-700 text-white pl-11"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <Label htmlFor="price" className="text-gray-300 mb-2 block">
                  Prix moyen
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    id="price"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    placeholder="6€ - 12€"
                    className="bg-[#1a1a1a] border-gray-700 text-white pl-11"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-gray-300 mb-2 block">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez l'ambiance, les spécialités, ce qui rend ce bar unique..."
                rows={4}
                className="bg-[#1a1a1a] border-gray-700 text-white resize-none"
              />
            </div>

            {/* Status */}
            <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-gray-800">
              <div>
                <Label htmlFor="status" className="text-gray-300">
                  Statut du bar
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Le bar est-il actuellement ouvert ?
                </p>
              </div>
              <Switch
                id="status"
                checked={formData.isOpen}
                onCheckedChange={(checked) => setFormData({ ...formData, isOpen: checked })}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-700 text-white hover:bg-[#2a2a2a]"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
              >
                {isEdit ? 'Enregistrer les modifications' : 'Créer le bar'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile - Full Page */}
      <div className="md:hidden fixed inset-0 z-50 bg-[#1a1a1a] animate-in slide-in-from-bottom duration-300">
        <div className="sticky top-0 z-10 bg-[#242424] border-b border-gray-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-white">
              {isEdit ? 'Modifier le bar' : 'Nouveau bar'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto h-full pb-24">
          <div className="p-4 space-y-4">
            {/* Image Upload */}
            <div>
              <Label className="text-gray-300 mb-2 block">Photo du bar</Label>
              <div className="w-full h-40 bg-[#242424] border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Upload className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Ajouter une photo</p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="name-mobile" className="text-gray-300 mb-2 block">
                Nom du bar *
              </Label>
              <Input
                id="name-mobile"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Le Comptoir Craft"
                required
                className="bg-[#242424] border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="address-mobile" className="text-gray-300 mb-2 block">
                Adresse *
              </Label>
              <Input
                id="address-mobile"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="15 rue de la Soif, Paris"
                required
                className="bg-[#242424] border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="specialty-mobile" className="text-gray-300 mb-2 block">
                Spécialité *
              </Label>
              <Input
                id="specialty-mobile"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                placeholder="Ex: Bières artisanales"
                required
                className="bg-[#242424] border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="phone-mobile" className="text-gray-300 mb-2 block">
                Téléphone
              </Label>
              <Input
                id="phone-mobile"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+33 1 42 XX XX XX"
                className="bg-[#242424] border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="hours-mobile" className="text-gray-300 mb-2 block">
                Horaires
              </Label>
              <Input
                id="hours-mobile"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                placeholder="17h00 - 02h00"
                className="bg-[#242424] border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="price-mobile" className="text-gray-300 mb-2 block">
                Prix moyen
              </Label>
              <Input
                id="price-mobile"
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                placeholder="6€ - 12€"
                className="bg-[#242424] border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="description-mobile" className="text-gray-300 mb-2 block">
                Description
              </Label>
              <Textarea
                id="description-mobile"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez le bar..."
                rows={4}
                className="bg-[#242424] border-gray-700 text-white resize-none"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#242424] rounded-lg border border-gray-800">
              <div>
                <Label htmlFor="status-mobile" className="text-gray-300">
                  Bar ouvert
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  Actuellement ouvert
                </p>
              </div>
              <Switch
                id="status-mobile"
                checked={formData.isOpen}
                onCheckedChange={(checked) => setFormData({ ...formData, isOpen: checked })}
              />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-[#242424] border-t border-gray-800 p-4 space-y-2">
            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6"
            >
              {isEdit ? 'Enregistrer' : 'Créer le bar'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full border-gray-700 text-white hover:bg-[#2a2a2a] py-6"
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
