import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { AuthGuard } from 'src/app/auth.guard';
import { StaffLeaveManagementComponent } from './staff-leave-management/staff-leave-management.component';


const routes: Routes = [
  // {
  //   path: '',  // Base path for the staff dashboard
  //   component: StaffDashboardComponent,
  //   canActivate: [AuthGuard]  // Protect the route with AuthGuard to ensure only logged-in users can access
  // },

  {
    path: '',  // Base path for the staff dashboard
    component: StaffDashboardComponent,
    canActivate: [AuthGuard],  // Protect the route with AuthGuard
    children: [
      { path: 'staff-leave-management', component: StaffLeaveManagementComponent }  // Route for leave management
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffDashboardRoutingModule { }
