import { Injectable, signal, computed } from '@angular/core';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  image: string;
  abv: number;
  ibu: number;
  description: string;
  firstBrewed: string;
}

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  private beersData: Beer[] = [
    {
      id: 1,
      name: 'Punk IPA',
      tagline: 'Post Modern Classic',
      image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop',
      abv: 5.6,
      ibu: 60,
      description:
        "Une bière IPA américaine moderne avec des notes d'agrumes et de pin. Houblonnée à outrance avec des houblons américains.",
      firstBrewed: '04/2007',
    },
    {
      id: 2,
      name: 'Dead Pony Club',
      tagline: 'Amplified Pale Ale',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=300&h=400&fit=crop',
      abv: 3.8,
      ibu: 35,
      description: 'Une pale ale légère et rafraîchissante avec des saveurs tropicales et agrumes.',
      firstBrewed: '10/2013',
    },
    {
      id: 3,
      name: 'Trashy Blonde',
      tagline: "You Know You Shouldn't",
      image: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=300&h=400&fit=crop',
      abv: 4.1,
      ibu: 41,
      description:
        'Une bière blonde légère avec un caractère malté et une finale houblonnée subtile.',
      firstBrewed: '04/2008',
    },
    {
      id: 4,
      name: '5 AM Saint',
      tagline: 'Beats Sleeping',
      image: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=300&h=400&fit=crop',
      abv: 5.0,
      ibu: 42,
      description: 'Une amber ale américaine avec des notes caramel et une amertume équilibrée.',
      firstBrewed: '11/2009',
    },
    {
      id: 5,
      name: 'Elvis Juice',
      tagline: 'Grapefruit Infused IPA',
      image: 'https://images.unsplash.com/photo-1610188051589-a1fa492a0c44?w=300&h=400&fit=crop',
      abv: 6.5,
      ibu: 60,
      description:
        "Une IPA infusée au pamplemousse avec une explosion d'agrumes et une amertume rafraîchissante.",
      firstBrewed: '10/2015',
    },
    {
      id: 6,
      name: 'Hazy Jane',
      tagline: 'New England IPA',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop',
      abv: 5.0,
      ibu: 30,
      description:
        'Une NEIPA trouble avec des notes tropicales intenses de mangue, pêche et fruits de la passion.',
      firstBrewed: '06/2017',
    },
    {
      id: 7,
      name: 'Brewdog IPA',
      tagline: 'India Pale Ale',
      image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=300&h=400&fit=crop',
      abv: 6.0,
      ibu: 55,
      description: 'Une IPA classique avec des arômes floraux et une finale amère équilibrée.',
      firstBrewed: '03/2010',
    },
    {
      id: 8,
      name: 'Pale Ale',
      tagline: 'American Style',
      image: 'https://images.unsplash.com/photo-1623637589145-15d33c2c77f6?w=300&h=400&fit=crop',
      abv: 4.5,
      ibu: 38,
      description:
        'Une pale ale américaine avec des notes de fruits tropicaux et une amertume modérée.',
      firstBrewed: '07/2012',
    },
  ];

  // Signal pour toutes les bières
  beers = signal<Beer[]>(this.beersData);

  // Méthode pour obtenir toutes les bières
  getBeers() {
    return this.beers;
  }
}
