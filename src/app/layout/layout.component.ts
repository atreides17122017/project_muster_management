import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
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

        // ✅ ONLY NEW ONE USES ROUTE
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
    // ✅ Open in new tab (for roles)
    if (item.newTab && item.route) {
      window.open(item.route, '_blank');
      return;
    }

    // ✅ Normal routing
    if (item.route) {
      this.router.navigate([item.route]);
    }

    // ✅ Old fallback
    else if (item.id) {
      this.router.navigate(['/page', item.id], {
        queryParams: { name: item.name },
      });
    }
  }
}
