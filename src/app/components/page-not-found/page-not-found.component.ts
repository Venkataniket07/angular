import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="error-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <a routerLink="/home" class="btn-home">Go Home</a>
    </div>
  `,
  styles: [`
    .error-container {
      text-align: center;
      padding: 4rem;
      color: #2d3748;
    }
    h1 {
      font-size: 6rem;
      margin: 0;
      color: var(--danger-color, #ef4444);
    }
    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .btn-home {
      display: inline-block;
      margin-top: 1.5rem;
      text-decoration: none;
      color: var(--primary-color, #667eea);
      font-weight: 600;
    }
    .btn-home:hover {
      text-decoration: underline;
    }
  `]
})
export class PageNotFoundComponent {}
