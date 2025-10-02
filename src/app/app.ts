import { Component, signal } from '@angular/core';
import { env } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('beer_tap');
  constructor() {
    console.log(env.production);
  }
}
