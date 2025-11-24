import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { BarService } from '../../services/bar-service';
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

  delete_bar(barToDelete: Bar | undefined) {
    console.log(barToDelete);
    const updatedBars = this.bars().filter((bar) => bar.id !== barToDelete?.id);
    this.bars.set(updatedBars);

    if (this.selected_bar() === barToDelete) {
        this.selected_bar.set(undefined);
    }
  }
}
