import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { MenuItem } from './models';

interface StatCounter {
  label: string;
  icon: string;
  target: number;
  current: number;
  suffix: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  customizerItem: MenuItem | null = null;
  customizerOpen = false;
  statsAnimated = false;
  statsObserver: IntersectionObserver | null = null;
  stats: StatCounter[] = [
    { label: 'Cups Served Daily', icon: '☕', target: 500, current: 0, suffix: '+' },
    { label: 'Bean Origins', icon: '🌍', target: 12, current: 0, suffix: '' },
    { label: 'Years Roasting', icon: '🔥', target: 8, current: 0, suffix: '' },
    { label: 'Happy Regulars', icon: '😊', target: 2000, current: 0, suffix: '+' },
  ];

  searchQuery = '';
  activeCategory = 'all';
  categories = [
    { key: 'all', label: 'All' },
    { key: 'hot', label: 'Hot' },
    { key: 'cold', label: 'Cold' },
    { key: 'specialty', label: 'Specialty' },
  ];

  menuItems: MenuItem[] = [
    { name: 'Espresso', description: 'Rich and bold, pulled to perfection', price: '$3.50', priceNum: 3.50, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop', category: 'hot' },
    { name: 'Cappuccino', description: 'Velvety foam meets robust espresso', price: '$4.50', priceNum: 4.50, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop', category: 'hot' },
    { name: 'Pour Over', description: 'Single origin, hand-poured with care', price: '$5.00', priceNum: 5.00, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', category: 'hot' },
    { name: 'Cold Brew', description: 'Smooth, slow-steeped for 18 hours', price: '$5.50', priceNum: 5.50, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop', category: 'cold' },
    { name: 'Matcha Latte', description: 'Ceremonial grade matcha with oat milk', price: '$5.50', priceNum: 5.50, image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop', category: 'specialty' },
    { name: 'Affogato', description: 'Espresso poured over vanilla gelato', price: '$6.00', priceNum: 6.00, image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400&h=400&fit=crop', category: 'specialty' },
  ];

  get filteredMenuItems(): MenuItem[] {
    const query = this.searchQuery?.trim().toLocaleLowerCase();
    return this.menuItems.filter(item => {
      const matchesCategory = this.activeCategory === 'all' || item.category === this.activeCategory;
      const matchesSearch = !query || item.name.toLocaleLowerCase().match(query) !== null;
      return matchesCategory && matchesSearch;
    });
  }

  ngAfterViewInit(): void {
    this.setupStatsObserver();
  }

  ngOnDestroy(): void {
    this.statsObserver?.disconnect();
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToMenu(): void {
    this.scrollTo('menu');
  }

  setCategory(key: string): void {
    this.activeCategory = key;
  }

  openCustomizer(item: MenuItem) {
    this.customizerItem = item;
    this.customizerOpen = true;
  }

  private setupStatsObserver() {
    const el = document.getElementById('stats');
    if (!el) return;
    this.statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.statsAnimated) {
          this.statsAnimated = true;
          this.animateStats();
        }
      },
      { threshold: 0.3 }
    );
    this.statsObserver.observe(el);
  }

  private animateStats() {
    const fps = 60;
    const steps = 2 * fps;
    this.stats.forEach((stat: StatCounter) => {
      const increment = stat.target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current = Math.min(current + increment, stat.target);
        stat.current = Math.floor(current);
        if (current >= stat.target) {
          stat.current = stat.target;
          clearInterval(interval);
        }
      }, 1000 / fps);
    });
  }

  trackByName(_: number, item: MenuItem) { return item.name; }
  trackByStat(_: number, stat: StatCounter) { return stat.label; }
}
