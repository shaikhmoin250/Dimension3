import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  messages: string[] = [];
  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.messages$.subscribe(message => {
      this.messages.push(message);
      setTimeout(() => this.messages.shift(), 3000);
    });
  }
}
