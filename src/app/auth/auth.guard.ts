import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestToBackendService } from '../request-to-backend.service';
import { Router } from '@angular/router'; 

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
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise((resolve, reject) => {
      this.reqService
      .sendRequest('GET', 'http://localhost:3000/api/reauthorize', true, "application/json")
      .subscribe({
        next: (response) => {
          // console.log(response);

          if(response.hasOwnProperty('body')) {
            response = JSON.stringify(response.body);
            let resObj = JSON.parse(response);

            if(resObj.authorized) {
              console.log('User reauthorized via web token');
              resolve (true);
            }
            else {
              console.log('token invalid');
              this.router.navigate(['login']);
              reject (false);
            }
          }
        }, 
        error: (err) => {
          console.log(err);
          this.router.navigate(['login']);
          reject (false);
        }
      })
    });

  }

}