import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform {
  constructor(private lang: LanguageService) {}
  transform(value: string): string {
    return this.lang.translate(value);
  }
}
