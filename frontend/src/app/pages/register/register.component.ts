import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) {}
  register() {
    if (this.auth.register(this.username, this.password)) {
      this.router.navigate(['/']);
    }
  }
}
