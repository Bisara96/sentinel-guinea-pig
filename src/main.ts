import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from "@sentry/angular";

import { AppModule } from './app/app.module';

Sentry.init({
  dsn: "https://f98bcab9a1bbb3383b4de21364501c5b@o4511048190722048.ingest.de.sentry.io/4511048195833936",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  tracesSampleRate: 1.0,
  environment: "production",
  sendDefaultPii: true,
  debug: false
});


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
