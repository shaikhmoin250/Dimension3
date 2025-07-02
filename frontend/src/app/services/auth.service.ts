import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedIn = false;
  username = '';
  login(u: string, p: string) {
    this.loggedIn = true;
    this.username = u;
    return true;
  }
  register(u: string, p: string) {
    this.loggedIn = true;
    this.username = u;
    return true;
  }
  logout() {
    this.loggedIn = false;
    this.username = '';
  }
}
