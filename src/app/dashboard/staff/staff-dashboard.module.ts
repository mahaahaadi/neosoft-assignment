import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffDashboardRoutingModule } from './staff-dashboard-routing.module';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { StaffLeaveManagementComponent } from './staff-leave-management/staff-leave-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';  // Import the pagination module

@NgModule({
  declarations: [StaffDashboardComponent, StaffLeaveManagementComponent],
  imports: [
    CommonModule,
    StaffDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class StaffDashboardModule { }
