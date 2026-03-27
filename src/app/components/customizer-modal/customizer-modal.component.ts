import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MenuItem } from '../../models';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-customizer-modal',
  templateUrl: './customizer-modal.component.html',
  styleUrls: ['./customizer-modal.component.scss']
})
export class CustomizerModalComponent implements OnChanges {
  @Input() item: MenuItem | null = null;
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  size = 'medium';
  milk = 'Whole';
  extras: string[] = [];

  readonly sizes = [
    { key: 'small', label: 'Small', modifier: -0.50 },
    { key: 'medium', label: 'Medium', modifier: 0 },
    { key: 'large', label: 'Large', modifier: 0.75 },
  ];
  readonly milkOptions = ['Whole', 'Oat', 'Almond', 'Skim', 'None'];
  readonly extrasOptions = [
    { label: 'Extra Shot', price: 0.75 },
    { label: 'Vanilla Syrup', price: 0.50 },
    { label: 'Caramel Drizzle', price: 0.50 },
    { label: 'Whipped Cream', price: 0.50 },
  ];

  constructor(private cart: CartService, private toast: ToastService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']?.currentValue === true) {
      this.size = 'medium';
      this.milk = 'Whole';
      this.extras = [];
    }
  }

  close() {
    this.closed.emit();
  }

  toggleExtra(label: string) {
    const idx = this.extras.indexOf(label);
    if (idx > -1) this.extras.splice(idx, 1);
    else this.extras.push(label);
  }

  isExtraSelected(label: string): boolean {
    return this.extras.includes(label);
  }

  get price(): number {
    if (!this.item) return 0;
    let p = this.item.priceNum;
    p += this.sizes.find(s => s.key === this.size)?.modifier ?? 0;
    p += this.extras.reduce((sum, label) => {
      return sum + (this.extrasOptions.find(e => e.label === label)?.price ?? 0);
    }, 0);
    return p;
  }

  addToCart() {
    if (!this.item) return;
    this.cart.add(this.item, this.size, this.milk, this.extras, this.price);
    this.toast.show(`${this.item.name} added to cart!`, 'success');
    this.close();
  }
}
