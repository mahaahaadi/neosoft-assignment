import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  contactNumber: string;
  role: string;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/users`;  // Using the environment variable
  

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<boolean> {
    return this.http.get<{ id: number; name: string; username: string; password: string; email: string; contactNumber: string; role: string; department: string; }[]>(this.apiUrl)
      .pipe(
        map(users => {
          const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
          
          localStorage.setItem('user', JSON.stringify(user));  // Convert user object to a JSON string
          localStorage.setItem('role', user?.role ?? '');
          localStorage.setItem('userId', user?.id.toString() ?? '');

          return !!user; // Returns true if user is found, false otherwise
        }),
        catchError(error => {
          console.error('Login error:', error);
          return of(false); // Return false in case of any error
        })
      );
  }
}
