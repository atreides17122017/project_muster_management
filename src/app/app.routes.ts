import { Routes } from '@angular/router';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

import { MusterHomeComponent } from './muster-home/muster-home.component';
import { MusterDashboardComponent } from './muster-dashboard/muster-dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [

  // ADMIN
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // MUSTER SUPERVISOR
  {
    path: 'muster',
    component: MusterHomeComponent,
    children: [
      { path: 'dashboard', component: MusterDashboardComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // DEFAULT
  { path: '', redirectTo: 'admin', pathMatch: 'full' }

];