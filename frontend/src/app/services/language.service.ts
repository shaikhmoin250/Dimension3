import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private countrySubject = new BehaviorSubject<string>('US');
  private translationsSubject = new BehaviorSubject<Record<string, string>>({});
  readonly translations$ = this.translationsSubject.asObservable();

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('country');
    const c = stored || environment.defaultCountry || 'US';
    this.countrySubject.next(c);
    this.loadTranslations(c);
  }

  get country(): string {
    return this.countrySubject.value;
  }

  setCountry(country: string) {
    this.countrySubject.next(country);
    try { localStorage.setItem('country', country); } catch {}
    this.loadTranslations(country);
  }

  translate(key: string): string {
    return this.translationsSubject.value[key] || key;
  }

  private loadTranslations(country: string) {
    const lang = this.countryToLang(country);
    this.http.get<Record<string, string>>(`assets/i18n/${lang}.json`).subscribe({
      next: t => this.translationsSubject.next(t),
      error: () => this.translationsSubject.next({})
    });
  }

  private countryToLang(country: string): string {
    switch (country) {
      case 'FR':
        return 'fr';
      default:
        return 'en';
    }
  }
}
