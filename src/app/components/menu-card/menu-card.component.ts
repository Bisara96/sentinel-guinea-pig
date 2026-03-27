import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from '../../models';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {
  @Input() item!: MenuItem;
  @Output() customize = new EventEmitter<MenuItem>();

  rating = 0;
  ratingCount = 0;
  hoverRating = 0;
  readonly starRange = [1, 2, 3, 4, 5];

  private readonly storageKey = 'bb-ratings';

  ngOnInit() {
    this.loadRating();
  }

  private loadRating() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
      const r = data[this.item.name];
      if (r) {
        this.rating = r.total / r.count;
        this.ratingCount = r.count;
      }
    } catch { /* ignore */ }
  }

  rate(stars: number) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
      if (!data[this.item.name]) data[this.item.name] = { total: 0, count: 0 };
      data[this.item.name].total += stars;
      data[this.item.name].count++;
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      this.rating = data[this.item.name].total / data[this.item.name].count;
      this.ratingCount = data[this.item.name].count;
    } catch { /* ignore */ }
    this.hoverRating = 0;
  }

  displayRating(): number {
    return this.hoverRating || Math.round(this.rating);
  }

  isStarFilled(star: number): boolean {
    return star <= this.displayRating();
  }
}
