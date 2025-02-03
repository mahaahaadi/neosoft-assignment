import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HodGuard implements CanActivate {
 
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === 'HOD') {  // Check if user role is HOD
        return true;
      }
    }
    this.router.navigate(['/login']);  // Redirect to login if not HOD or not logged in
    return false;
  }
  
}
