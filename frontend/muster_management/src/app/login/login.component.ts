import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Direct tracking properties for input masking state
  isPasswordVisible: boolean = false;
  passwordFieldType: string = 'password';
  private maskTimeout: any = null;

  togglePasswordVisibility(): void {
    // If password text is currently hidden, unmask it
    if (!this.isPasswordVisible) {
      this.isPasswordVisible = true;
      this.passwordFieldType = 'text';

      // Clear any active timers running to prevent execution collisions
      if (this.maskTimeout) {
        clearTimeout(this.maskTimeout);
      }

      // Explicitly trigger masking state restoration after exactly 3000ms
      this.maskTimeout = setTimeout(() => {
        this.isPasswordVisible = false;
        this.passwordFieldType = 'password';
      }, 3000);

    } else {
      // Manual reset override if clicked again before the 3s window finishes
      this.isPasswordVisible = false;
      this.passwordFieldType = 'password';
      
      if (this.maskTimeout) {
        clearTimeout(this.maskTimeout);
      }
    }
  }
}