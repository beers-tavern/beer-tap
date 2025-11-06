import { X, User, Mail, Phone, MapPin, Calendar, Edit2, LogOut, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { useState } from 'react';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    city: 'Paris, France',
    memberSince: 'Novembre 2024',
  });

  if (!isOpen) return null;

  const handleSave = () => {
    setIsEditing(false);
    // Ici vous pouvez ajouter la logique pour sauvegarder les données
  };

  return (
    <>
      {/* Desktop - Dialog */}
      <div className="hidden md:block">
        <div 
          className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
          onClick={onClose}
        />
        
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#242424] border border-gray-700 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="sticky top-0 bg-[#242424] border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl text-white">Mon compte</h2>
            <button
              onClick={onClose}
              className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" alt={userData.name} />
                <AvatarFallback className="bg-amber-500 text-black text-2xl">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-2xl text-white mb-1">{userData.name}</h3>
                <p className="text-gray-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Membre depuis {userData.memberSince}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-gray-700 text-white hover:bg-[#2a2a2a]"
                >
                  Changer la photo
                </Button>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 text-center">
                <p className="text-3xl text-amber-500 mb-1">12</p>
                <p className="text-gray-400 text-sm">Avis donnés</p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 text-center">
                <p className="text-3xl text-amber-500 mb-1">5</p>
                <p className="text-gray-400 text-sm">Favoris</p>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* User Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-white">Informations personnelles</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Annuler' : 'Modifier'}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nom complet
                  </Label>
                  <Input
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[#1a1a1a] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>

                <div>
                  <Label className="text-gray-400 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[#1a1a1a] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>

                <div>
                  <Label className="text-gray-400 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Téléphone
                  </Label>
                  <Input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[#1a1a1a] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>

                <div>
                  <Label className="text-gray-400 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Ville
                  </Label>
                  <Input
                    value={userData.city}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[#1a1a1a] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>
              </div>

              {isEditing && (
                <Button
                  onClick={handleSave}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                >
                  Enregistrer les modifications
                </Button>
              )}
            </div>

            <Separator className="bg-gray-800" />

            {/* Security & Logout */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-gray-700 text-white hover:bg-[#2a2a2a]"
              >
                <Shield className="w-4 h-4 mr-2" />
                Sécurité et mot de passe
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-red-900/50 text-red-400 hover:bg-red-950/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile - Full Page */}
      <div className="md:hidden fixed inset-0 z-50 bg-[#1a1a1a] animate-in slide-in-from-bottom duration-300">
        <div className="sticky top-0 z-10 bg-[#242424] border-b border-gray-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-white">Mon compte</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-full pb-6">
          <div className="p-4 space-y-6">
            {/* Avatar Section */}
            <div className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-3">
                <AvatarImage src="" alt={userData.name} />
                <AvatarFallback className="bg-amber-500 text-black text-xl">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl text-white mb-1">{userData.name}</h3>
              <p className="text-gray-400 text-sm">
                Membre depuis {userData.memberSince}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-gray-700 text-white hover:bg-[#2a2a2a]"
              >
                Changer la photo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#242424] p-3 rounded-lg border border-gray-800 text-center">
                <p className="text-2xl text-amber-500 mb-1">12</p>
                <p className="text-gray-400 text-xs">Avis</p>
              </div>
              <div className="bg-[#242424] p-3 rounded-lg border border-gray-800 text-center">
                <p className="text-2xl text-amber-500 mb-1">5</p>
                <p className="text-gray-400 text-xs">Favoris</p>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* User Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white">Informations</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  {isEditing ? 'Annuler' : 'Modifier'}
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-gray-400 mb-2 text-sm flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nom
                  </Label>
                  <Input
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[#242424] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>

                <div>
                  <Label className="text-gray-400 mb-2 text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[#242424] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>

                <div>
                  <Label className="text-gray-400 mb-2 text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Téléphone
                  </Label>
                  <Input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[#242424] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>

                <div>
                  <Label className="text-gray-400 mb-2 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Ville
                  </Label>
                  <Input
                    value={userData.city}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[#242424] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>
              </div>

              {isEditing && (
                <Button
                  onClick={handleSave}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6"
                >
                  Enregistrer
                </Button>
              )}
            </div>

            <Separator className="bg-gray-800" />

            {/* Actions */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-gray-700 text-white hover:bg-[#2a2a2a]"
              >
                <Shield className="w-4 h-4 mr-2" />
                Sécurité
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-red-900/50 text-red-400 hover:bg-red-950/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
