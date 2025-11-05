import { Beer, User, Plus, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

interface HeaderProps {
  onOpenProfile: () => void;
  onOpenCreateBar: () => void;
}

export function Header({ onOpenProfile, onOpenCreateBar }: HeaderProps) {
  return (
    <header className="bg-[#242424] border-b border-gray-800 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded-lg">
            <Beer className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-white tracking-tight">Beers Tavern</h1>
            <p className="text-gray-400 text-sm hidden md:block">Découvrez les meilleurs bars</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Create Bar Button - Desktop */}
          <Button
            onClick={onOpenCreateBar}
            className="hidden md:flex bg-amber-500 hover:bg-amber-600 text-black gap-2"
          >
            <Plus className="w-4 h-4" />
            Créer un bar
          </Button>

          {/* User Menu - Desktop */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="w-9 h-9 border-2 border-amber-500">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-amber-500 text-black">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-[#242424] border-gray-700 text-white"
              >
                <DropdownMenuLabel className="text-gray-400">Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={onOpenProfile}
                  className="cursor-pointer focus:bg-[#2a2a2a] focus:text-white"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onOpenCreateBar}
                  className="cursor-pointer focus:bg-[#2a2a2a] focus:text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Créer un bar</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-[#2a2a2a] focus:text-white">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="cursor-pointer focus:bg-red-950/20 focus:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Avatar - Mobile */}
          <button 
            onClick={onOpenProfile}
            className="md:hidden"
          >
            <Avatar className="w-9 h-9 border-2 border-amber-500">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-amber-500 text-black">
                JD
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
}
