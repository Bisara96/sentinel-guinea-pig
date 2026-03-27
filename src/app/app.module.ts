import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { CustomizerModalComponent } from './components/customizer-modal/customizer-modal.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';

import * as Sentry from "@sentry/angular";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartDrawerComponent,
    MenuCardComponent,
    CustomizerModalComponent,
    TestimonialsComponent,
    NewsletterComponent,
    ToastContainerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }