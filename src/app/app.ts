import { Component, signal } from '@angular/core';
import { env } from '../environments/environment';
import { MapComponent } from "./components/MapComponent";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [MapComponent]
})
export class App {
  protected readonly title = signal('Beers Tavern');
}
