import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedIn = false;
  username = '';

  constructor() {
    const session = localStorage.getItem('session');
    if (session) {
      this.loggedIn = true;
      this.username = session;
    }
  }

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  private saveUsers(users: any[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  login(u: string, p: string) {
    const user = this.getUsers().find(x => x.username === u && x.password === p);
    if (user) {
      this.loggedIn = true;
      this.username = u;
      localStorage.setItem('session', u);
      return true;
    }
    return false;
  }

  register(u: string, p: string) {
    const users = this.getUsers();
    if (users.find(x => x.username === u)) {
      return false;
    }
    users.push({ username: u, password: p });
    this.saveUsers(users);
    this.loggedIn = true;
    this.username = u;
    localStorage.setItem('session', u);
    return true;
  }

  logout() {
    this.loggedIn = false;
    this.username = '';
    localStorage.removeItem('session');
  }
}
