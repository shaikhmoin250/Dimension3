import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { ToastComponent } from '../components/toast/toast.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { TranslatePipe } from '../pipes/translate.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchBarComponent,
    ToastComponent,
    LoadingSpinnerComponent,
    TranslatePipe
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    SearchBarComponent,
    ToastComponent,
    LoadingSpinnerComponent,
    TranslatePipe,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
