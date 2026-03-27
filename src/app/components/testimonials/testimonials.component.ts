import { Component, OnDestroy, OnInit } from '@angular/core';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
  avatarColor: string;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [
    {
      name: 'Sarah Mitchell',
      role: 'Regular since 2024',
      quote: 'Brew & Bean has completely ruined other coffee for me. The pour over is an experience, not just a drink.',
      initials: 'SM',
      avatarColor: '#e8d5c4'
    },
    {
      name: 'James Okonkwo',
      role: 'Coffee Enthusiast',
      quote: 'I dragged my whole team here for a Tuesday morning. We never went back to the office pod coffee again.',
      initials: 'JO',
      avatarColor: '#c4d5e8'
    },
    {
      name: 'Priya Nair',
      role: 'Freelance Designer',
      quote: 'Best work-from-cafe vibes in Brooklyn. The Cold Brew keeps me focused and the space keeps me inspired.',
      initials: 'PN',
      avatarColor: '#d5e8c4'
    },
    {
      name: 'Marco Deluca',
      role: 'Food Blogger',
      quote: 'The Affogato is ridiculous. Rich espresso, perfect gelato. I\'ve described it in three separate posts.',
      initials: 'MD',
      avatarColor: '#e8c4d5'
    },
    {
      name: 'Amara Chen',
      role: 'Yoga Instructor',
      quote: 'The Matcha Latte with oat milk is part of my morning ritual. Consistent, smooth, and never too sweet.',
      initials: 'AC',
      avatarColor: '#e8e4c4'
    },
  ];

  activeIndex = 0;
  isHovered = false;
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (!this.isHovered) this.next();
    }, 5000);
  }

  stopTimer() {
    if (this.timer) clearInterval(this.timer);
  }

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
  }

  prev() {
    this.activeIndex = (this.activeIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goTo(index: number) {
    this.activeIndex = index;
  }

  get active(): Testimonial {
    return this.testimonials[this.activeIndex];
  }
}
