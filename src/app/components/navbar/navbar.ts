import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BarCard } from '../bar-card/bar-card';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, BarCard],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() search!: string;
  @Input() bars!: Bar[];
  @Input() selected: Bar | undefined;

  @Output() select_bar = new EventEmitter<Bar>();

  @Output() update_search = new EventEmitter<string>();

  update_selected_bar(bar: Bar) {
    this.select_bar.emit(bar);
  }
}
