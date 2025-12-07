import { Component, inject, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { PopUpFormBarComponent } from '../pop-up-form-bar/pop-up-form-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopUpFormBarData } from '../../models/pop-up-form-bar-data';
import { BarForm } from '../../models/barForm';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  authService = inject(AuthService);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);

  isOnBarsPage = false;

  @Output() newBar = new EventEmitter<Partial<BarForm>>();

  constructor() {
    // Vérifier la route initiale
    this.isOnBarsPage = this.router.url.includes('/bars');

    // Écouter les changements de route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOnBarsPage = event.url.includes('/bars');
      });
  }

  logout(): void {
    if (confirm('Voulez-vous vous déconnecter ?')) {
      this.authService.logout();
      this.router.navigate(['/bars']);
    }
  }

  openAddBarDialog(): void {
    const dialogRef = this.dialog.open(PopUpFormBarComponent, {
      width: '500px',
      height: '600px',
      data: {
        modifyMode: false,
        bar: null,
      } as PopUpFormBarData,
    });

    dialogRef.afterClosed().subscribe((result: BarForm) => {
      if (result) {
        result.modifyMode = false;
        this.newBar.emit(result);
      }
    });
  }
}
