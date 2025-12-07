import { AuthService } from '../../services/auth.service';
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarService } from '../../services/bar-service';
import { AuthService } from '../../services/auth.service';
import { Bar } from '../../models/bar';
import { BarForm } from '../../models/barForm';
import { Navbar } from '../../components/navbar/navbar';
import { BarMapComponent } from '../../components/bar-map/bar-map';
import { Header } from '../../components/header/header';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bars-page',
  templateUrl: './bars-page.html',
  imports: [
    CommonModule,
    BarMapComponent,
    Header,
    Navbar,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class BarsPage {

  private barService = inject(BarService);
<<<<<<< HEAD
  authService = inject(AuthService);
  private router = inject(Router);
=======
  private authService = inject(AuthService);

  // آیا کاربر فعلی ادمین است؟
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
>>>>>>> 85fe261 (Update KHA with auth & reviews)

  bars = this.barService.get_all_bars_signal();


  bar_filter = signal('');

  selected_bar: WritableSignal<Bar | undefined> = signal(undefined);

  filtered_bars = computed(() =>
    this.bars().filter((bar) => bar.name.toLowerCase().startsWith(this.bar_filter().toLowerCase()))
  );

  update_bar_filter(event: Event) {
    let target = event.target as HTMLInputElement;
    this.bar_filter.set(target.value);
  }
  select_bar(bar: Bar | undefined) {
    this.selected_bar.set(bar);
  }

  delete_bar(barToDelete: number | undefined) {
    if (!this.authService.isAdmin()) {
      alert('Accès refusé : rôle administrateur requis');
      return;
    }

    const updatedBars = this.bars().filter((bar) => bar.id !== barToDelete?.toString());
    this.bars.set(updatedBars);

    if (this.selected_bar()?.id === barToDelete?.toString()) {
      this.selected_bar.set(undefined);
    }
  }

  modify_bar(barForm: BarForm) {
    if (!this.authService.isAdmin()) {
      alert('Accès refusé : rôle administrateur requis');
      return;
    }

    const barToUpdate = this.bars().find((bar) => bar.id === barForm.id.toString());
    if (!barToUpdate) return;

    const barUpdated: Bar = this.patchBarWithForm(barToUpdate, barForm);

    const updatedBars = this.bars().map((bar) =>
      bar.id === barUpdated.id ? barUpdated : bar
    );
    this.bars.set(updatedBars);
  }

  patchBarWithForm(barToUpdate: Bar, barForm: BarForm): Bar {
    return {
      ...barToUpdate,
      name: barForm.name,
      category: barForm.category,
      status: barForm.status,
      address: barForm.address,
      lat: barForm.lat,
      lng: barForm.lng,
      latitude: barForm.lat,
      longitude: barForm.lng
    };
  }

  addBar(newBar: Partial<BarForm>) {
    if (!this.authService.isAdmin()) {
      alert('Accès refusé : rôle administrateur requis');
      return;
    }

    const current = this.bars();
    const maxId = current.reduce((m, b) => Math.max(m, parseInt(b.id)), 0);
    const barToAdd: Bar = {
      id: (maxId + 1).toString(),
      name: newBar.name ?? 'Sans nom',
      category: newBar.category ?? '',
      rating: 0,
      distance: 0,
      status: (newBar.status as 'Ouvert' | 'Fermé') ?? 'Ouvert',
      address: newBar.address ?? '',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=200&fit=crop',
      lat: newBar.lat ?? 0,
      lng: newBar.lng ?? 0,
      latitude: newBar.lat ?? 0,
      longitude: newBar.lng ?? 0,
      description: 'Nouveau bar',
      phone: '+33 1 23 45 67 89',
      openingHours: '10h-2h',
      reviewCount: 0
    };
    this.bars.set([...current, barToAdd]);
  }
}
