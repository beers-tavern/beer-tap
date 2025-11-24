import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { BarService } from '../../services/bar-service';
import { Navbar } from '../../components/navbar/navbar';
import { BarMapComponent } from '../../components/bar-map/bar-map';
import { Header } from '../../components/header/header';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import test from 'node:test';

@Component({
  selector: 'app-bars-page',
  templateUrl: './bars-page.html',
  imports: [
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
    const updatedBars = this.bars().filter((bar) => bar.id !== barToDelete);
    this.bars.set(updatedBars);

    if (this.selected_bar() === barToDelete) {
        this.selected_bar.set(undefined);
    }
  }

  modify_bar(barForm: BarForm) {
    const barToUpdate = this.bars().find((bar) => bar.id === barForm.id);
    const barUpdated : Bar = this.patchBarWithForm(barToUpdate, barForm);

    const updatedBars = this.bars().map((bar) =>
      bar.id === barUpdated.id ? barUpdated : bar
    );
    this.bars.set(updatedBars);
  }
  patchBarWithForm(barToUpdate: Bar | undefined, barForm: BarForm): Bar {
    if(barToUpdate?.name && barForm.name !== barToUpdate?.name){
      barToUpdate.name = barForm.name;
    } else if (barToUpdate?.category && barForm.category !== barToUpdate?.category){
      barToUpdate.category = barForm.category;
    } else if (barToUpdate?.status && barForm.status !== barToUpdate?.status){
      barToUpdate.status = barForm.status;
    } else if (barToUpdate?.address && barForm.address !== barToUpdate?.address){
      barToUpdate.address = barForm.address;
    } else if (barToUpdate?.lat && barForm.lat !== barToUpdate?.lat){
      barToUpdate.lat = barForm.lat;
    } else if (barToUpdate?.lng && barForm.lng !== barToUpdate?.lng){
      barToUpdate.lng = barForm.lng;
    }
    return barToUpdate as Bar;
  }

  addBar(newBar: Partial<BarForm>) {
    const current = this.bars();
    const maxId = current.reduce((m, b) => Math.max(m, b.id), 0);
    const barToAdd: Bar = {
      id: maxId + 1,
      name: newBar.name ?? 'Sans nom',
      category: newBar.category ?? '',
      rating: (newBar as any).rating ?? 0,
      distance: (newBar as any).distance ?? 0,
      status: (newBar.status as 'Ouvert' | 'Fermé') ?? 'Ouvert',
      address: newBar.address ?? '',
      image: '',
      lat: newBar.lat ?? 0,
      lng: newBar.lng ?? 0,
    };
    this.bars.set([...current, barToAdd]);
  }
}
