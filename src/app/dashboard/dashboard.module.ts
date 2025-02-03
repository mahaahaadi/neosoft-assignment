// dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [DashboardComponent, StaffManagementComponent, LeaveManagementComponent],
  imports: [CommonModule, DashboardRoutingModule, FormsModule, ReactiveFormsModule, NgxPaginationModule]
})
export class DashboardModule {}
