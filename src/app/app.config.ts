import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

/**
 * Application Configuration
 * This constant defines the global providers and configuration for the Angular application.
 * It is used in the bootstrapping process (main.ts).
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // specialized providers for handling global errors in the browser
    provideBrowserGlobalErrorListeners(),
    
    // Sets up the router with the defined routes
    provideRouter(routes),
    
    // Enables hydration for Server-Side Rendering (SSR) with event replay capabilities
    provideClientHydration(withEventReplay()),
    
    // Configures the HTTP client to allow making requests (e.g., to JSONPlaceholder)
    // withFetch() uses the modern Fetch API
    provideHttpClient(withFetch()),
  ]
};
