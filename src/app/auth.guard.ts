import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    const user = localStorage.getItem('user'); // Check if user data is stored in local storage
    if (user) {
      return true;  // Allow access to the route
    } else {
      // this.router.navigate(['/login']);  // Redirect to login if not logged in
      return this.router.parseUrl('/login');
    }
  }
}
