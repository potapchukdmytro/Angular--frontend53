import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(authService.isAdmin()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
