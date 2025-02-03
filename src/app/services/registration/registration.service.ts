import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = `${environment.apiUrl}/users`;  // Using the environment variable

  constructor(private http: HttpClient) {}

  register(userData: { name: string; username: string; email: string; contactNumber: string; department: string; password: string }): Observable<any> {
    return this.http.get<Array<any>>(`${this.apiUrl}?username=${userData.username}&email=${userData.email}`)
      .pipe(
        switchMap(users => {
          if (users.length > 0) {
            // If any users are returned, a user already exists with the same username or email
            return throwError(() => new Error('User already exists with the same username or email'));
          } else {
            // If no users are found, proceed to registration
            return this.http.post(`${this.apiUrl}`, userData);
          }
        }),
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => error);
        })
      );
  }
}
