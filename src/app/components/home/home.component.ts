import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <div class="content">
        <h1>Welcome to User Manager</h1>
        <p>The premium way to manage your connections.</p>
        <button routerLink="/users" class="btn-primary">View Users</button>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      text-align: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 20px;
      margin: 2rem;
    }
    .content h1 {
      font-size: 3rem;
      color: #2d3748;
      margin-bottom: 1rem;
    }
    .content p {
      font-size: 1.25rem;
      color: #4a5568;
      margin-bottom: 2rem;
    }
    .btn-primary {
      padding: 1rem 2rem;
      font-size: 1.125rem;
      background: var(--primary-color, #667eea);
      color: white;
      border: none;
      border-radius: 8px;
      transition: transform 0.2s;
    }
    .btn-primary:hover {
      transform: scale(1.05);
    }
  `]
})
export class HomeComponent {}
