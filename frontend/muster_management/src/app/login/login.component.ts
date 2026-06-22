import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  isPasswordVisible = false;
  passwordFieldType = 'password';

  private maskTimeout: any = null;

  constructor(
    private http: HttpClient,
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

  login() {

  // ADMIN LOGIN
  if (
    this.username === 'admin' &&
    this.password === '123456'
  ) {

    this.router.navigate(['/dashboard']);

    return;
  }

  // SUPERVISOR / BILL DEALER LOGIN

  const body = {
    username: this.username,
    password: this.password
  };

  this.http.post<any>(
    'http://127.0.0.1:8000/api/supervisor-login',
    body
  )
  .subscribe({

    next: (response) => {

      console.log(response);

      // save complete supervisor object
      localStorage.setItem(
        'loggedSupervisor',
        JSON.stringify(response.user)
      );

      const role = response.user.role.toLowerCase();

      if (role === 'supervisor') {

        this.router.navigate(['/supervisor']);

      }
      else if (role === 'bill dealer') {

        this.router.navigate(['/bill-dealer']);

      }
      else {

        alert('Unknown role');

      }

    },

    error: (err) => {

      console.log(err);

      alert('Invalid username or password');

    }

  });

}


}