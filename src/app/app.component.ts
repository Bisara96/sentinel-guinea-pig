import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems = [
    { name: 'Espresso', description: 'Rich and bold, pulled to perfection', price: '$3.50', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop' },
    { name: 'Cappuccino', description: 'Velvety foam meets robust espresso', price: '$4.50', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop' },
    { name: 'Pour Over', description: 'Single origin, hand-poured with care', price: '$5.00', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop' },
    { name: 'Cold Brew', description: 'Smooth, slow-steeped for 18 hours', price: '$5.50', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop' },
    { name: 'Matcha Latte', description: 'Ceremonial grade matcha with oat milk', price: '$5.50', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop' },
    { name: 'Affogato', description: 'Espresso poured over vanilla gelato', price: '$6.00', image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400&h=400&fit=crop' },
  ];

  scrollTo(sectionId: string): void {
    throw new Error('New error for sentry');
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
