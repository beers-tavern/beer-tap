import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { AchievementsComponent } from '../../components/achievements/achievements.component';

@Component({
  selector: 'app-beers-page',
  templateUrl: './achievements-page.html',
  imports: [AchievementsComponent, Header],
})
export class AchievementsPageComponent {}
