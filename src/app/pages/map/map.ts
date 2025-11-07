import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { BarService } from '../../services/bar-service';
import { Navbar } from '../../components/navbar/navbar';
import { BarMapComponent } from '../../components/bar-map/bar-map';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  imports: [BarMapComponent, Header, Navbar],
  styleUrl: './map.css',
})
export class MapPageComponent {
  private barService = inject(BarService);

  bars = this.barService.get_all_bars();

  bar_filter = signal('');

  selected_bar: WritableSignal<Bar | undefined> = signal(undefined);

  filtered_bars = computed(() =>
    this.bars.filter((bar) => bar.name.toLowerCase().startsWith(this.bar_filter().toLowerCase()))
  );

  update_bar_filter(event: Event) {
    let target = event.target as HTMLInputElement;
    this.bar_filter.set(target.value);
  }

  select_bar(bar: Bar) {
    this.selected_bar.set(bar);
  }
}
