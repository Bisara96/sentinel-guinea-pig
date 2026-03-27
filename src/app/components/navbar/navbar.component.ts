import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  darkMode = false;

  constructor(public cart: CartService) {}

  ngOnInit() {
    const saved = localStorage.getItem('bb-dark-mode');
    this.darkMode = saved === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('bb-dark-mode', String(this.darkMode));
    document.body.classList.toggle('dark', this.darkMode);
  }

  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
