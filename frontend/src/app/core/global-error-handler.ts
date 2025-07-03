import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  handleError(error: unknown): void {
    const toast = this.injector.get(ToastService);
    console.error('Unexpected error', error);
    toast.show('An unexpected error occurred');
  }
}
