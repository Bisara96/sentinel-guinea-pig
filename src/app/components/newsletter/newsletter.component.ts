import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  email = '';
  submitted = false;
  error = '';

  constructor(private toast: ToastService) {}

  submit() {
    this.error = '';
    if (!this.email.trim()) {
      this.error = 'Please enter your email address.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.error = 'Please enter a valid email address.';
      return;
    }
    this.submitted = true;
    this.toast.show("You're on the list! ☕", 'success');
  }

  reset() {
    this.email = '';
    this.submitted = false;
    this.error = '';
  }
}
