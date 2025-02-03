import { Component } from '@angular/core';
import { HODService } from '../services/HOD/hod.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  staffCount: number = 0;
 
  loggedInHODDepartment: string = JSON.parse(localStorage.getItem('user')!).department;  // Store the HOD's department here
  
  constructor(private hodService: HODService, private router: Router) { }
  
  ngOnInit(): void {

    const storedUser = localStorage.getItem('user');  // 'user' is the key where the user data is stored
    if (storedUser) {
      const user = JSON.parse(storedUser);  // Parse the JSON string into an object
      this.loggedInHODDepartment = user.department;  // Get the department from the user object
 
  
      // Pass the department to get the count of staff members in the same department
      this.hodService.getStaffCount(this.loggedInHODDepartment).subscribe(count => {
        
        this.staffCount = count;
      });
    }

    this.setupListeners();
    if (this.isLight()) {
      this.toggleRootClass();
    }

    
    // Assume the logged-in HOD's department is stored somewhere (from login response, etc.)
    // this.loggedInHODDepartment = 'Mathematics';  // Example department, dynamically set based on login response


    // Pass the department to get the count of staff members in the same department
    this.hodService.getStaffCount(this.loggedInHODDepartment).subscribe(count => {
      this.staffCount = count;
    });
  }

  // handburger stuffs
  setupListeners(): void {
    const sidebarToggle = document.querySelector("#sidebar-toggle");
    sidebarToggle?.addEventListener("click", () => {
      document.querySelector("#sidebar")?.classList.toggle("collapsed");
    });

    const themeToggle = document.querySelector(".theme-toggle");
    themeToggle?.addEventListener("click", () => {
      this.toggleLocalStorage();
      this.toggleRootClass();
    });
  }

  toggleRootClass(): void {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const invertedTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', invertedTheme);
  }

  toggleLocalStorage(): void {
    if (this.isLight()) {
      localStorage.removeItem("light");
    } else {
      localStorage.setItem("light", "set");
    }
  }

  isLight(): boolean {
    return localStorage.getItem("light") !== null;
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
