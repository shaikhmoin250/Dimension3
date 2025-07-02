import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private auth: AuthService, private router: Router, private toast: ToastService) {}
  login() {
    if (this.auth.login(this.username, this.password)) {
      this.toast.show('Logged in');
      this.router.navigate(['/']);
    } else {
      this.toast.show('Invalid credentials');
    }
  }
}
