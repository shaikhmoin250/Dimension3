import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  country: string;
  constructor(public auth: AuthService, public theme: ThemeService, private lang: LanguageService) {
    this.country = this.lang.country;
  }
  toggleTheme() {
    this.theme.toggle();
  }
  changeCountry(c: string) {
    this.lang.setCountry(c);
  }
}
