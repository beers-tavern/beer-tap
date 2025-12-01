import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  // Si non authentifié, rediriger vers login
  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  // Si authentifié mais pas admin, rediriger vers bars avec message
  console.error('Accès refusé : rôle administrateur requis');
  return router.createUrlTree(['/bars']);
};
