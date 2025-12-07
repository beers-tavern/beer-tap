import { Component } from '@angular/core';
import { BeerListComponent } from "../../components/beer-list/beer-list.component";
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-beers-page',
  templateUrl: './beers-page.html',
  styleUrls: ['./beers-page.css'],
  imports: [BeerListComponent, Header],
})
export class BeersPageComponent {}
