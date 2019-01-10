import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  addUser (newUser: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/registration', newUser, httpOptions)
      .pipe(
        catchError(this.handleError<User>('addUser'))
      );
  }

  verifyUser (credentials: Object): Observable<Object> {
    return this.http.post<Object>('http://localhost:3000/api/login', credentials, httpOptions)
      .pipe(
        catchError(this.handleError<Object>('verifyUser'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
