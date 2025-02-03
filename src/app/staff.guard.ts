import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === 'staff') {  // Check if user role is staff
        return true;
      }
    }
    this.router.navigate(['/login']);  // Redirect to login if not staff or not logged in
    return false;
  }
}
