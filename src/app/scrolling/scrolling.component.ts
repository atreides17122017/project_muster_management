import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scrolling',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scrolling.component.html',
  styleUrls: ['./scrolling.component.css'],
})
export class ScrollingComponent {
  text = `Important dates:
(1) NDA submission is due from the 1st to the 5th of every month
(2) Muster submission is due from the 11th to the 12th of every month.`;

  noticeboard = `
<center><h1 style="font-weight:bold;"><u>INSTRUCTIONS</u></h1></center>
<center><h2 style="color:blue;">1.Muster should be submitted before 12th of every month.</h2></center>
<center><h2 style="color:blue;">2.Joining date / Relieving date must be updated.</h2></center>
<center><h2 style="color:blue;">3.Documents must be uploaded in MMS.</h2></center>
<center><h2 style="color:blue;">4.Use helpdesk before 10th only.</h2></center>
<center><h3>No changes after final submission.</h3></center>
<center><strong><h3>Check FINAL PRINT after submit</h3></strong></center>
<center>Thank you.<br>SrDPO/BZA</center>
`;

  constructor() {
    const savedText = localStorage.getItem('scrollingText');
    const savedNotice = localStorage.getItem('noticeboard');

    if (savedText) {
      this.text = savedText;
    }

    if (savedNotice) {
      this.noticeboard = savedNotice;
    }
  }

  saveScrolling() {
    localStorage.setItem('scrollingText', this.text);

    localStorage.setItem('noticeboard', this.noticeboard);

    alert('Updated successfully');

    window.location.href = '/dashboard';
  }
}
