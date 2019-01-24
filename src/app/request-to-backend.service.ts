import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

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

    return this.http.request(new HttpRequest(method, url, body, {headers: httpOptions.headers}));
  }

  base64EncodeUnicode(str: string): string {
    // First, we use encodeURIComponent to get percent-encoded UTF-8,
    // Then, we convert the percent encodings into raw bytes which can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
          return String.fromCharCode(parseInt(`0x${p1}`, 16));
        }
    ));
  }

}
