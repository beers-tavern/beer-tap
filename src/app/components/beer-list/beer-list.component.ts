import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BeerService, Beer } from '../../services/beer.service';

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css'],
})
export class BeerListComponent {
  private beerService = inject(BeerService);

  // Signal pour le terme de recherche
  searchTerm = signal<string>('');

  // Signal pour toutes les bières depuis le service
  allBeers = this.beerService.getBeers();

  // Computed signal pour filtrer les bières
  filteredBeers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.allBeers();
    }
    return this.allBeers().filter(
      (beer) =>
        beer.name.toLowerCase().includes(term) ||
        beer.tagline.toLowerCase().includes(term) ||
        beer.description.toLowerCase().includes(term)
    );
  });

  selectedBeer: Beer | null = null;

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
  }

  openDialog(beer: Beer): void {
    this.selectedBeer = beer;
  }

  closeDialog(): void {
    this.selectedBeer = null;
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeDialog();
    }
  }
}
