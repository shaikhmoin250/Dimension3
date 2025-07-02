import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  constructor(private auth: AuthService, private router: Router, private toast: ToastService) {}
  register() {
    if (this.auth.register(this.username, this.password)) {
      this.toast.show('Account created');
      this.router.navigate(['/']);
    } else {
      this.toast.show('User already exists');
    }
  }
}
