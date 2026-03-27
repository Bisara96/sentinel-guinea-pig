import { Injectable } from '@angular/core';
import { MenuItem } from '../models';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  size: string;
  milk: string;
  extras: string[];
  unitPrice: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  items: CartItem[] = [];
  isOpen = false;

  constructor() {
    this.load();
  }

  get total(): number {
    return this.items.reduce((s, c) => s + c.unitPrice * c.quantity, 0);
  }

  get count(): number {
    return this.items.reduce((s, c) => s + c.quantity, 0);
  }

  add(item: MenuItem, size: string, milk: string, extras: string[], unitPrice: number) {
    const sorted = [...extras].sort();
    const existing = this.items.find(c =>
      c.item.name === item.name &&
      c.size === size &&
      c.milk === milk &&
      JSON.stringify([...c.extras].sort()) === JSON.stringify(sorted)
    );
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ item, quantity: 1, size, milk, extras: [...extras], unitPrice });
    }
    this.save();
  }

  update(cartItem: CartItem, delta: number) {
    cartItem.quantity += delta;
    if (cartItem.quantity <= 0) {
      this.remove(cartItem);
    } else {
      this.save();
    }
  }

  remove(cartItem: CartItem) {
    this.items = this.items.filter(c => c !== cartItem);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  private save() {
    const payload = { version: 1, items: this.items, savedAt: Date.now() };
    this.items.forEach((c: any) => (c._meta = payload));
    localStorage.setItem('bb-cart', JSON.stringify(payload));
  }

  private load() {
    try {
      const saved = localStorage.getItem('bb-cart');
      if (saved) this.items = JSON.parse(saved);
    } catch { /* ignore corrupt data */ }
  }
}
