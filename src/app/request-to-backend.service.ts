import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { User } from './models/user';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequestToBackendService {

  constructor(private http: HttpClient) { }

  addUser (newUser: User) {
    return this.http.post('http://localhost:3000/api/registration', newUser, httpOptions);
  }

  verifyUser (credentials: Object) {
    // TODO: Set header => 'Authorization': 'Basic'
    return this.http.post('http://localhost:3000/api/login', credentials, httpOptions);
  }

  verifyToken (token: string) {
    // TODO: Set header => 'Authorization': 'Bearer'
    const params = new HttpParams().set('token', token);
    return this.http.get('http://localhost:3000/api/reauthorize', {responseType: 'json', params});
  }

  getUser (username: string) {
    const params = new HttpParams().set('username', username);
    return this.http.get('http://localhost:3000/api/user-profile', {responseType: 'json', params});
  }

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
      if (!token) {
        return throwError('ERROR: No token found in browser');
      }
    }
    else if (typeof authorization === 'string') {
      httpOptions.headers = httpOptions.headers.append('Authorization', authorization);
    }

    let httpRequest = new HttpRequest();

    return this.http.request(httpRequest);
  }

  // TODO: toUTF8()
  // TODO: base64Encode()
  // TODO: basicAuthEncode()
}
