import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  showNoticeModal = false;
  currentActiveItemName: string = '';

  menus = [
    {
      title: 'Master Data',
      open: true,
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
      name: 'Supervisor' // Fixed to route dynamically into the shared admin matrix grid
    }
  ];

  constructor(public router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveHighlightToken();
    });
  }

  ngOnInit() {
    const adminSessionToken = sessionStorage.getItem('mms_admin_session_active');
    if (!adminSessionToken) {
      this.showNoticeModal = true;
      sessionStorage.setItem('mms_admin_session_active', 'true');
    }
    this.updateActiveHighlightToken();
  }

  updateActiveHighlightToken() {
    const urlSegments = this.router.url.split('/');
    if (urlSegments.includes('page')) {
      this.currentActiveItemName = decodeURIComponent(urlSegments[urlSegments.length - 1]);
    } else if (urlSegments.includes('scrolling')) {
      this.currentActiveItemName = 'Scrolling';
    } else {
      this.currentActiveItemName = 'Dashboard';
    }
  }

  getScrollingText() {
    return (
      localStorage.getItem('scrollingText') ||
      `Important dates: (1) NDA submission is due from the 1st to the 5th of every month (2) Muster submission is due from the 11th to the 12th of every month.`
    );
  }

  closeNoticeModal() {
    this.showNoticeModal = false;
  }

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