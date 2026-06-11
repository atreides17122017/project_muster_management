import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ IMPORTANT

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isCollapsed = false;

  constructor(private router: Router) {}

  menus = [
    {
      title: 'Master Data',
      open: false,
      items: [
        { name: 'Employee', id: 1 },
        { name: 'Bill Unit', id: 2 },
        { name: 'Stations', id: 3 },
        { name: 'Department', id: 4 },
        { name: 'Input Options', id: 5 },
        { name: 'Scrolling', route: '/scrolling' },
      ],
    },
    {
      title: 'Roles',
      open: false,
      items: [
        { name: 'Bill Dealer', route: '/bill-dealer', newTab: true },
        { name: 'Muster Supervisor', route: '/muster-supervisor', newTab: true },
      ],
    },
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigate(item: any) {
    if (item.route) {
      this.router.navigate([item.route]);
    } else {
      this.router.navigate(['/page', item.name]); // ✅ FIXED
    }
  }
}
