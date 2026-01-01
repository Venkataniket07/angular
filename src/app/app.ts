import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Root Component
 * Acts as the shell for the application, providing the main navigation
 * and the router outlet where pages are rendered.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">User Manager</div>
      <div class="nav-links">
        <a routerLink="/home" routerLinkActive="active">Home</a>
        <a routerLink="/users" routerLinkActive="active">Users</a>
      </div>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      background: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-brand {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color, #667eea);
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    .nav-links a {
      text-decoration: none;
      color: #64748b;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover {
      color: var(--primary-color, #667eea);
    }
    .nav-links a.active {
      color: var(--primary-color, #667eea);
      font-weight: 700;
    }
    main {
      padding-top: 2rem;
    }
  `]
})
export class App {}
