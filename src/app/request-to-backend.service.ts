import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class RequestToBackendService {

  constructor(private http: HttpClient) { }

  addUser (newUser: User) {
    return this.http.post('http://localhost:3000/api/registration', newUser, httpOptions);
  }

  verifyUser (credentials: Object) {
    return this.http.post('http://localhost:3000/api/login', credentials, httpOptions);
  }
}
