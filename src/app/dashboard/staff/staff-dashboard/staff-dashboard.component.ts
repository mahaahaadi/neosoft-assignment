import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/services/Staff/leave.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})

export class StaffDashboardComponent implements OnInit {
  
  totalLeaves: number = 0;
  approvedLeaves: number = 0;
  rejectedLeaves: number = 0;
  pendingLeaves: number = 0;
  
  constructor(private router: Router, private leaveService: LeaveService){}

  ngOnInit(): void {
    this.setupListeners();
    if (this.isLight()) {
      this.toggleRootClass();
    }
   
    const userId = localStorage.getItem('userId');  // Retrieve the logged-in user's ID

    if (userId) {
      console.log('User ID retrieved from localStorage:', userId);  // Log userId to ensure it's correct

      this.leaveService.getLeavesByUserId(userId).subscribe(leaves => {
        console.log('Leaves fetched from server:', leaves);  // Log the fetched leaves

        this.totalLeaves = leaves.length;
        this.approvedLeaves = leaves.filter(leave => leave.status.toLowerCase() === 'approved').length;
        this.rejectedLeaves = leaves.filter(leave => leave.status.toLowerCase() === 'rejected').length;
        this.pendingLeaves = leaves.filter(leave => leave.status.toLowerCase() === 'pending').length;

        // Log the results for troubleshooting
        console.log(`Total Leaves: ${this.totalLeaves}`);
        console.log(`Approved Leaves: ${this.approvedLeaves}`);
        console.log(`Rejected Leaves: ${this.rejectedLeaves}`);
        console.log(`Pending Leaves: ${this.pendingLeaves}`);
      });
    } else {
      console.log('No user ID found in localStorage.');
    }
  
  }


  // sidebar functions
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
