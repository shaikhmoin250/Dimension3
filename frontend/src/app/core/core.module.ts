import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app-config';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { ThemeService } from '../services/theme.service';
import { ToastService } from '../services/toast.service';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: APP_CONFIG, useValue: { apiUrl: environment.apiUrl } as AppConfig },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    AuthService,
    CartService,
    OrderService,
    ProductService,
    ThemeService,
    ToastService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent?: CoreModule) {
    if (parent) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
