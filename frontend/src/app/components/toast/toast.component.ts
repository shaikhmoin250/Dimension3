import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  messages: string[] = [];
  show(message: string) {
    this.messages.push(message);
    setTimeout(() => this.messages.shift(), 3000);
  }
}
