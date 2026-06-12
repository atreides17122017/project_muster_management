import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablePageComponent } from './common/table-page/table-page.component';
import { ScrollingComponent } from './scrolling/scrolling.component';
import { BillDealerComponent } from './bill-dealer/bill-dealer.component';
import { MusterSupervisorComponent } from './muster-supervisor/muster-supervisor.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },

  // Master pages
  { path: 'page/:id', component: TablePageComponent },

  // Special pages
  { path: 'scrolling', component: ScrollingComponent },
  { path: 'bill-dealer', component: BillDealerComponent },
  { path: 'muster-supervisor', component: MusterSupervisorComponent },
];