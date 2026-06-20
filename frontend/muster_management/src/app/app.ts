import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Import your login component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent], // Include it here
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // Global baseline layout operations tracking state
}