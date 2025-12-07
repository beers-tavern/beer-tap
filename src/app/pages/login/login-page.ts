// src/app/pages/login/login-page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'login-page.html',
})
export class LoginPage {
  username = '';
  password = '';
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const ok = this.authService.login(this.username, this.password);

    if (ok) {
      this.error = null;
      // بعد از لاگین فعلاً همیشه می‌فرستیم به /bars
      this.router.navigateByUrl('/bars');
    } else {
      this.error = 'Nom d’utilisateur ou mot de passe incorrect.';
    }
  }
}
