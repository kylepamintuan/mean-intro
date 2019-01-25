import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestToBackendService {

  constructor(private http: HttpClient) { }

  sendRequest(
    method: 'GET' | 'POST' = 'GET',
    url = '',
    authorization: boolean | string = true,
    contentType: 'application/json' | 'application/x-www-form-urlencoded' = 'application/json',
    body = {}
  ): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType
      })
    };
    
    if (authorization === true) {
      const token = localStorage.getItem('token');

      if(token) {
        httpOptions.headers = httpOptions.headers.append('Authorization', `Bearer ${token}`);
      }
      else {
        return throwError("No token exists");
      }

    }
    else if (typeof authorization === 'string') {
      let basicCredentials = this.base64EncodeUnicode(authorization);
      httpOptions.headers = httpOptions.headers.append('Authorization', `Basic ${basicCredentials}`);
    }

    return this.http
    .request(new HttpRequest(method, url, body, {headers: httpOptions.headers}))
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } 
    else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  };

  base64EncodeUnicode(str: string): string {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
          return String.fromCharCode(parseInt(`0x${p1}`, 16));
        }
    ));
  }

}
