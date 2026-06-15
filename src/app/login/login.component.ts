import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  isPasswordVisible = false;
  passwordFieldType = 'password';
  private maskTimeout: any = null;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {

    if (!this.isPasswordVisible) {

      this.isPasswordVisible = true;
      this.passwordFieldType = 'text';

      if (this.maskTimeout) {
        clearTimeout(this.maskTimeout);
      }

      this.maskTimeout = setTimeout(() => {
        this.isPasswordVisible = false;
        this.passwordFieldType = 'password';
      }, 3000);

    } else {

      this.isPasswordVisible = false;
      this.passwordFieldType = 'password';

      if (this.maskTimeout) {
        clearTimeout(this.maskTimeout);
      }

    }

  }

  login(): void {

    const data = {
      username: this.username,
      password: this.password
    };

    this.api.login(data).subscribe({

      next: (response: any) => {

        console.log(response);

        // Save JWT token
        localStorage.setItem('token', response.token);

        // Role-based navigation
        if (response.user.role === 'admin') {

          this.router.navigate(['/dashboard']);

        }

        else if (response.user.role === 'bill_dealer') {

          this.router.navigate(['/bill-dealer']);

        }

        else if (response.user.role === 'muster_supervisor') {

          this.router.navigate(['/muster-supervisor']);

        }

        else {

          alert('Unknown role');

        }

      },

      error: (error: any) => {

        console.log(error);

        alert('Invalid username or password');

      }

    });

  }

}