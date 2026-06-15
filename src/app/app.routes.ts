import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TablePageComponent } from './common/table-page/table-page.component';
import { ScrollingComponent } from './scrolling/scrolling.component';
import { BillDealerComponent } from './bill-dealer/bill-dealer.component';
import { MusterSupervisorComponent } from './muster-supervisor/muster-supervisor.component';

export const routes: Routes = [

  // First page
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login page
  {
    path: 'login',
    component: LoginComponent
  },

  // Remaining pages use LayoutComponent
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'page/:id',
        component: TablePageComponent
      },

      {
        path: 'scrolling',
        component: ScrollingComponent
      },

      {
        path: 'bill-dealer',
        component: BillDealerComponent
      },

      {
        path: 'muster-supervisor',
        component: MusterSupervisorComponent
      }

    ]
  }

];