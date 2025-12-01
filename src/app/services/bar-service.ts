import { Injectable } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Bar, CreateBarDto, UpdateBarDto } from '../models/bar';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user';

const imageMap: Record<string, string> = {
  'craft-beer-bar':
    'https://images.unsplash.com/photo-1649798584143-11549c12a7ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBiYXJ8ZW58MXx8fHwxNzYxNTgxNTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'modern-bar':
    'https://images.unsplash.com/photo-1760982192590-de2b005bb4d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE1Nzk0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'tavern-interior':
    'https://images.unsplash.com/photo-1656758073866-e12c8d8de36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXZlcm4lMjBwdWJ8ZW58MXx8fHwxNzYxNTgxNTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'brewery-pub':
    'https://images.unsplash.com/photo-1721412181600-0d05cb6c46d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmV3ZXJ5JTIwcHVifGVufDF8fHx8MTc2MTU4MTU0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  'traditional-bar':
    'https://images.unsplash.com/photo-1578174532946-fa6e6d86c763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGJhcnxlbnwxfHx8fDE3NjE1ODE1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

@Injectable({
  providedIn: 'root',
})
export class BarService {
  private barsSignal = signal<Bar[]>([]);
  
  all_bars : any[] = [
    { id: '1', name: 'Le Comptoir Craft', category: 'Bières artisanales', rating: 4.7, distance: 0.5, status: 'Ouvert', address: '15 rue de la Soif, Paris', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=200&fit=crop', lat: 48.8606, lng: 2.3376 },
    { id: '2', name: 'The Hoppy Place', category: 'IPA & Stouts', rating: 4.5, distance: 1.2, status: 'Ouvert', address: '28 avenue des Houblons, Paris', image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=200&h=200&fit=crop', lat: 48.8616, lng: 2.3396 },
    { id: '3', name: 'La Taverne du Malt', category: 'Bières belges', rating: 4.8, distance: 0.8, status: 'Fermé', address: '42 boulevard du Breuvage, Paris', image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=200&h=200&fit=crop', lat: 48.862, lng: 2.335 },
    { id: '4', name: 'Le Zinc Doré', category: 'Bar traditionnel', rating: 4.4, distance: 2.1, status: 'Ouvert', address: '33 rue des Tonneaux, Paris', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=200&h=200&fit=crop', lat: 48.858, lng: 2.342 },
    { id: '5', name: 'Les Bulles de Paris', category: 'Champagne & Cocktails', rating: 4.9, distance: 1.5, status: 'Ouvert', address: '12 rue des Flûtes, Paris', image: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=200&h=200&fit=crop', lat: 48.8595, lng: 2.3385 },
    { id: '6', name: 'La Chope Bavaroise', category: 'Bières allemandes', rating: 4.6, distance: 2.3, status: 'Ouvert', address: '7 avenue de la Bière, Paris', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200&h=200&fit=crop', lat: 48.857, lng: 2.34 },
    { id: '7', name: 'Le Bistrot Houblon', category: 'IPA & Ales', rating: 4.2, distance: 3.0, status: 'Fermé', address: '21 rue de la Lune, Paris', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop', lat: 48.861, lng: 2.345 },
    { id: '8', name: 'La Cave du Malt', category: 'Bières locales & Taproom', rating: 4.7, distance: 1.8, status: 'Ouvert', address: '9 boulevard des Brasseurs, Paris', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&h=200&fit=crop', lat: 48.86, lng: 2.343 },
    { id: '9', name: "L'Artisan Houblon", category: 'Craft Beer & Cocktails', rating: 4.5, distance: 2.5, status: 'Ouvert', address: '5 rue des Brasseurs, Paris', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop', lat: 48.859, lng: 2.336 }
  ];

  constructor(private authService: AuthService) {
    this.initBars();
  }

  private initBars(): void {
    // Convertir les IDs en strings et ajouter les champs manquants
    this.all_bars = this.all_bars.map(bar => ({
      ...bar,
      id: bar.id.toString(),
      latitude: bar.lat,
      longitude: bar.lng,
      description: `Un excellent bar situé à ${bar.address}`,
      phone: '+33 1 23 45 67 89',
      openingHours: '10h-2h',
      reviewCount: Math.floor(Math.random() * 50) + 10
    }));
    this.barsSignal.set(this.all_bars);
  }

  get_all_bars_signal(): WritableSignal<Bar[]> {
    return this.barsSignal;
  }

  getAllBars(): Observable<Bar[]> {
    return of(this.all_bars).pipe(delay(300));
  }

  getBarById(id: string): Observable<Bar | undefined> {
    const bar = this.all_bars.find(b => b.id === id);
    return of(bar).pipe(delay(300));
  }

  // ===== ADMIN OPERATIONS =====

  createBar(dto: CreateBarDto): Observable<Bar> {
    if (!this.authService.hasRole(UserRole.ADMIN)) {
      return throwError(() => new Error('Accès refusé : rôle administrateur requis'));
    }

    const newBar: Bar = {
      ...dto,
      id: 'bar-' + Date.now(),
      rating: 0,
      distance: 0,
      status: dto.status || 'Ouvert',
      reviewCount: 0,
      createdAt: new Date(),
      category: dto.category || '',
      image: dto.image || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=200&fit=crop'
    };

    this.all_bars.push(newBar);
    this.barsSignal.set([...this.all_bars]);
    return of(newBar).pipe(delay(300));
  }

  updateBar(dto: UpdateBarDto): Observable<Bar> {
    if (!this.authService.hasRole(UserRole.ADMIN)) {
      return throwError(() => new Error('Accès refusé : rôle administrateur requis'));
    }

    const index = this.all_bars.findIndex(b => b.id === dto.id);
    
    if (index === -1) {
      return throwError(() => new Error('Bar introuvable'));
    }

    const updatedBar: Bar = {
      ...this.all_bars[index],
      ...dto,
      updatedAt: new Date()
    };

    this.all_bars[index] = updatedBar;
    this.barsSignal.set([...this.all_bars]);
    return of(updatedBar).pipe(delay(300));
  }

  deleteBar(id: string): Observable<void> {
    if (!this.authService.hasRole(UserRole.ADMIN)) {
      return throwError(() => new Error('Accès refusé : rôle administrateur requis'));
    }

    const index = this.all_bars.findIndex(b => b.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Bar introuvable'));
    }

    this.all_bars.splice(index, 1);
    this.barsSignal.set([...this.all_bars]);
    return of(void 0).pipe(delay(300));
  }
}
