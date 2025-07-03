import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private messagesSubject = new Subject<string>();
  messages$ = this.messagesSubject.asObservable();

  show(message: string) {
    this.messagesSubject.next(message);
  }
}
