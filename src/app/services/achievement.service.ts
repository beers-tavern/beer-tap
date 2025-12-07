import { Injectable, signal } from '@angular/core';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category: 'beers' | 'bars' | 'social' | 'expert';
  unlockedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AchievementsService {
  private achievementsData: Achievement[] = [
    {
      id: '1',
      title: 'Fan de Leffe',
      description: 'Goûter toutes les variétés de Leffe disponibles',
      icon: '🍺',
      unlocked: true,
      category: 'beers',
      unlockedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Explorateur IPA',
      description: 'Déguster 10 IPA différentes',
      icon: '🌿',
      unlocked: true,
      category: 'beers',
      unlockedAt: new Date('2024-02-20'),
    },
    {
      id: '3',
      title: 'Maître Brasseur',
      description: 'Essayer 50 bières différentes',
      icon: '👑',
      unlocked: false,
      category: 'beers',
    },
    {
      id: '4',
      title: 'Tour des Bars',
      description: 'Visiter 10 bars différents',
      icon: '🗺️',
      unlocked: true,
      category: 'bars',
      unlockedAt: new Date('2024-03-10'),
    },
    {
      id: '5',
      title: 'Ambassadeur',
      description: 'Partager 5 bars avec des amis',
      icon: '🤝',
      unlocked: false,
      category: 'social',
    },
    {
      id: '6',
      title: 'Connaisseur Belge',
      description: 'Goûter 15 bières belges différentes',
      icon: '🇧🇪',
      unlocked: false,
      category: 'beers',
    },
    {
      id: '7',
      title: 'Nuit Blanche',
      description: 'Rester dans un bar après minuit',
      icon: '🌙',
      unlocked: true,
      category: 'bars',
      unlockedAt: new Date('2024-01-28'),
    },
    {
      id: '8',
      title: 'Expert en Stout',
      description: 'Déguster 8 Stouts différentes',
      icon: '⚫',
      unlocked: false,
      category: 'expert',
    },
    {
      id: '9',
      title: 'Collectionneur',
      description: 'Débloquer 10 achievements',
      icon: '🏆',
      unlocked: false,
      category: 'expert',
    },
    {
      id: '10',
      title: 'Fidèle Client',
      description: 'Visiter le même bar 5 fois',
      icon: '⭐',
      unlocked: true,
      category: 'bars',
      unlockedAt: new Date('2024-02-05'),
    },
    {
      id: '11',
      title: 'Aventurier',
      description: 'Essayer une bière de chaque catégorie',
      icon: '🧭',
      unlocked: false,
      category: 'beers',
    },
    {
      id: '12',
      title: 'Social Butterfly',
      description: 'Laisser 20 avis sur des bars',
      icon: '🦋',
      unlocked: false,
      category: 'social',
    },
  ];

  achievements = signal<Achievement[]>(this.achievementsData);

  getAchievements() {
    return this.achievements;
  }

  getUnlockedCount(): number {
    return this.achievements().filter((a) => a.unlocked).length;
  }

  getTotalCount(): number {
    return this.achievements().length;
  }

  getProgressPercentage(): number {
    return Math.round((this.getUnlockedCount() / this.getTotalCount()) * 100);
  }
}
