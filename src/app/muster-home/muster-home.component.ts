import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-muster-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './muster-home.component.html',
  styleUrls: ['./muster-home.component.css']
})
export class MusterHomeComponent {
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}