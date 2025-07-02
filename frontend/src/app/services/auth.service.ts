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
    const session = sessionStorage.getItem('session');
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
  private async sha256(value: string): Promise<string> {
    const data = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async login(u: string, p: string): Promise<boolean> {
    const user = this.getUsers().find(x => x.username === u);
    if (!user) {
      return false;
    }
    const hash = await this.sha256(p + user.salt);
    if (hash === user.passwordHash) {
      this.currentUserSubject.next(u);
      sessionStorage.setItem('session', u);
      return true;
    }
    return false;
  }

  /**
   * Create a new user account and log them in.
   */
  async register(u: string, p: string): Promise<boolean> {
    const users = this.getUsers();
    if (users.find(x => x.username === u)) {
      return false;
    }
    const saltBytes = crypto.getRandomValues(new Uint8Array(16));
    const salt = Array.from(saltBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    const passwordHash = await this.sha256(p + salt);
    users.push({ username: u, passwordHash, salt });
    this.saveUsers(users);
    this.currentUserSubject.next(u);
    sessionStorage.setItem('session', u);
    return true;
  }

  /**
   * Log out the current user.
   */
  logout() {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem('session');
  }
}
