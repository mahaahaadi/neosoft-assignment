import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthLoginGuard } from './auth-login.guard';
import { StaffGuard } from './staff.guard';
AuthGuard
AuthLoginGuard

const routes: Routes = [
  // HOD Routes
  { path: 'register', component: RegistrationComponent, canActivate: [AuthLoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard] },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),  canActivate: [AuthGuard] },
  { path: 'staff-dashboard', loadChildren: () => import('./dashboard/staff/staff-dashboard.module').then(m => m.StaffDashboardModule), canActivate: [AuthGuard] },  // Protect Staff dashboard

  // Staff Routes
  { 
    path: 'staff-dashboard', 
    loadChildren: () => import('./dashboard/staff/staff-dashboard.module').then(m => m.StaffDashboardModule), 
    canActivate: [StaffGuard]  // Only accessible by staff
  },
  

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
