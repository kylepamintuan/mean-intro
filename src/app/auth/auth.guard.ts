import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RequestToBackendService } from '../request-to-backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private reqService: RequestToBackendService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.reqService
        .sendRequest('GET', 'http://localhost:3000/api/reauthorize', true, "application/json")
        .subscribe({
          next: () => resolve(true),
          error: () => {
            this.router.navigate(['login']);
            return resolve(false);
          }
        });
    });
  }

}