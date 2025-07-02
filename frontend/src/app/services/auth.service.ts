import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<string | null>(null);
  /**
   * Observable emitting the current username or null when logged out.
   */
  readonly currentUser$ = this.currentUserSubject.asObservable();

  /** Snapshot of the logged in username. */
  get username(): string {
    return this.currentUserSubject.value ?? '';
  }

  /** True if a user is logged in. */
  get loggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  constructor() {
    const session = localStorage.getItem('session');
    if (session) {
      this.currentUserSubject.next(session);
    }
  }

  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  private saveUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  /**
   * Attempt a login with username and password.
   */
  login(u: string, p: string): boolean {
    const user = this.getUsers().find(x => x.username === u && x.password === p);
    if (user) {
      this.currentUserSubject.next(u);
      localStorage.setItem('session', u);
      return true;
    }
    return false;
  }

  /**
   * Create a new user account and log them in.
   */
  register(u: string, p: string): boolean {
    const users = this.getUsers();
    if (users.find(x => x.username === u)) {
      return false;
    }
    users.push({ username: u, password: p });
    this.saveUsers(users);
    this.currentUserSubject.next(u);
    localStorage.setItem('session', u);
    return true;
  }

  /**
   * Log out the current user.
   */
  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('session');
  }
}
