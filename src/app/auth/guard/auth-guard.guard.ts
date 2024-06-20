
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';

import { tap } from 'rxjs';
import { AuthService } from '../service/auths.service';

export const AuthGuardCanActivate: CanActivateFn = (route, state) => {
  const userService = inject(AuthService);
  const router = inject(Router);

  return userService.tokenValidation().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigateByUrl('/login');
      }
    })
  );
};

export const AuthGuardcanMatch: CanMatchFn = () => {
  const router = inject(Router);
  const userService = inject(AuthService);

  return userService.tokenValidation().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) router.navigateByUrl('/login');
    })
  );
};