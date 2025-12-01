import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Bar } from '../../models/bar';

@Component({
  selector: 'app-bar-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './bar-card.html',
  styleUrls: ['./bar-card.css'],
})
export class BarCard {
  @Input() bar!: Bar;

  @Input() selected: boolean = false;

  @Output() select_bar = new EventEmitter<Bar>();
}
