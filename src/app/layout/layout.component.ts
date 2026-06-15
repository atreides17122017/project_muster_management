import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isCollapsed = false;

  constructor(public router: Router) {}

  menus = [
    {
      title: 'Master Data',
      open: false,
      items: [
        { name: 'Employee' },
        { name: 'Bill Unit' },
        { name: 'Stations' },
        { name: 'Department' },
        { name: 'Input Options' },
        { name: 'Scrolling', route: '/scrolling' },
      ],
    },
    {
      title: 'Supervisor',
      name: 'Supervisor' // ✅ FIXED
    }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu(menu: any) {
    menu.open = !menu.open;
  }

  navigate(item: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (item.route) {
      this.router.navigate([item.route]);
    } else {
      this.router.navigate(['/page', item.name]);
    }
  }
}