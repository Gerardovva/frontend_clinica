import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../service/auths.service';
import { map, tap } from 'rxjs';

export const publicGuardCanActive: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {
        const authService = inject(AuthService);
        const router = inject(Router);

        return authService.tokenValidation().pipe(
            tap( isAutenticated => {
                if(isAutenticated){
                    router.navigate(['inicio'])
                }
            }),
            map(isAutenticated => !isAutenticated)
        );
    }




export const PublicGuardCanMatch: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.tokenValidation().pipe(
        tap( isAutenticated => {
            if(isAutenticated){
                router.navigate(['inicio'])
            }
        }),
        map(isAutenticated => !isAutenticated)
    );
}