import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
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
        body = { token };
        // httpOptions.headers = httpOptions.headers.append('Authorization', 'Bearer' + token);
      }
      else {
        return throwError("No token exists");
      }

    }
    else if (typeof authorization === 'string') {
      // let basicCredentials = basicAuthEncode(authorization);
      // httpOptions.headers = httpOptions.headers.append('Authorization', 'Basic' + basicCredentials);
      
      /* Temporary */
      let credentials = authorization.split(':');
      let username = credentials[0];
      let password = credentials[1];
      body = { username, password };
    }
    
    return this.http.request(new HttpRequest(method, url, body, {headers: httpOptions.headers}));
  }

  // TODO: toUTF8()
  // TODO: base64Encode()
  // TODO: basicAuthEncode()
}
