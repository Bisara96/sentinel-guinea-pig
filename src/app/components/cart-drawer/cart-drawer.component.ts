import { Component } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cart-drawer',
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss']
})
export class CartDrawerComponent {
  constructor(public cart: CartService, private toast: ToastService) {}

  decrement(item: CartItem) {
    if (item.quantity === 1) {
      this.cart.remove(item);
      this.toast.show('Item removed', 'info');
    } else {
      this.cart.update(item, -1);
    }
  }

  checkout() {
    this.toast.show('Order placed! See you soon ☕', 'success');
    this.cart.clear();
    this.cart.isOpen = false;
  }

  extrasLabel(extras: string[]): string {
    return extras.join(', ');
  }

  trackByCart(_: number, item: CartItem) {
    return item.item.name + item.size + item.milk;
  }
}
