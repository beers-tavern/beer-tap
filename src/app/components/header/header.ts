import { Component, inject, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { PopUpFormBarComponent } from '../pop-up-form-bar/pop-up-form-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopUpFormBarData } from '../../models/pop-up-form-bar-data';
import { BarForm } from '../../models/barForm';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
})
export class Header {
  authService = inject(AuthService);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  
  @Output() newBar = new EventEmitter<Partial<BarForm>>();

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
        bar: null
      } as PopUpFormBarData
    });

    dialogRef.afterClosed().subscribe((result: BarForm) => {
      if (result) {
        result.modifyMode = false;
        this.newBar.emit(result);
      }
    });
  }
}
