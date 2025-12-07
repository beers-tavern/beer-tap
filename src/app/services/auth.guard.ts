// src/app/services/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // کاربر لاگین شده
    return true;
  }

  // کاربر لاگین نیست → هدایت به صفحه لاگین
  router.navigate(['/login']);
  return false;
};

