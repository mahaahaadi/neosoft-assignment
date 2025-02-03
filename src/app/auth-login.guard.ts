import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');  // Check if user data is stored in local storage
    if (user) {
      this.router.navigate(['/dashboard']);  // Redirect to dashboard if already logged in
      return false;
    } else {
      return true;  // Allow access to login/register
    }
  }
}
