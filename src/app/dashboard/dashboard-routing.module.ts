import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { AuthGuard } from '../auth.guard';


const routes: Routes = [
    {
      path: '', 
      component: DashboardComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'staff-management', component: StaffManagementComponent },
        { path: 'leave-management', component: LeaveManagementComponent }
      ]
    }
  ];
  

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }