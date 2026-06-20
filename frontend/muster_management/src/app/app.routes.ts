import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SupervisorComponent } from './supervisor-dashboard/supervisor.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TablePageComponent } from './admin/common/table-page/table-page.component';
import { ScrollingComponent } from './admin/scrolling/scrolling.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'supervisor', component: SupervisorComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'page/:id', component: TablePageComponent },
      { path: 'scrolling', component: ScrollingComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];