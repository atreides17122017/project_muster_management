import { Component, OnInit } from '@angular/core';
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
export class LayoutComponent implements OnInit {

  isCollapsed = false;

  // NOTICEBOARD POPUP
  showNoticeModal = true;

  noticeboard: string = '';

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
      name: 'Supervisor'
    }
  ];

  ngOnInit() {

    this.noticeboard =
      localStorage.getItem('noticeboard') ||

      `
      <center><h1><u>INSTRUCTIONS</u></h1></center>
      <center><h2 style="color:blue;">1. Muster should be submitted before 12th of every month.</h2></center>
      <center><h2 style="color:blue;">2. Joining date / Relieving date must be updated.</h2></center>
      <center><h2 style="color:blue;">3. Documents must be uploaded in MMS.</h2></center>
      <center><h2 style="color:blue;">4. Use helpdesk before 10th only.</h2></center>
      <center><h3>No changes after final submission.</h3></center>
      <center><strong><h3>Check FINAL PRINT after submit</h3></strong></center>
      <center>Thank you.<br>SrDPO/BZA</center>
      `;

  }

  // TICKER TEXT
  getScrollingText() {

    return (
      localStorage.getItem('scrollingText') ||

      `Important dates:
(1) NDA submission is due from the 1st to the 5th of every month
(2) Muster submission is due from the 11th to the 12th of every month`
    );

  }

  // CLOSE NOTICEBOARD POPUP
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