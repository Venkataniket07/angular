import { Component, input, output, ChangeDetectionStrategy, computed } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="user-card">
      <div class="user-info">
        <!-- Header: Avatar + Names -->
        <div class="user-header">
          <!-- Visually pleasing avatar generated from initials -->
          <div class="avatar-placeholder">
            {{ initials() }}
          </div>
          <div>
            <h3>{{ user().name }}</h3>
            <span class="username">@{{ user().username }}</span>
          </div>
        </div>
        
        <!-- Contact Details with Icons -->
        <div class="details">
          <div class="detail-item">
            <span>📧</span> {{ user().email }}
          </div>
          <div class="detail-item">
            <span>📞</span> {{ user().phone }}
          </div>
        </div>

        <!-- Company Badge (Conditional Rendering) -->
        @if (user().company.name) {
          <div class="company-badge">
            🏢 {{ user().company.name }}
          </div>
        }
      </div>

      <!-- Action Buttons: Edit & Delete -->
      <div class="actions">
        <button (click)="onEdit.emit(user())" class="btn-card btn-edit">
          ✏️ Edit
        </button>
        <button (click)="onDelete.emit(user().id)" class="btn-card btn-delete">
          🗑️ Delete
        </button>
      </div>
    </div>
  `,
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  // Input: Receives the user data from the parent list component
  // 'required' ensures we get a compilation error if we forget to pass it
  user = input.required<User>();

  // Outputs: Events emitted back to the parent component when buttons are clicked
  onEdit = output<User>();
  onDelete = output<number>();

  /**
   * Computed Signal: Automatically updates whenever the 'user' input changes.
   * Generates a 2-letter initial from the user's name (e.g., "John Doe" -> "JD").
   * Used for the avatar placeholder.
   */
  initials = computed(() => {
    const name = this.user().name;
    if (!name) return 'U'; // Fallback
    
    const parts = name.split(' ');
    if (parts.length >= 2) {
      // First letter of first name + First letter of last name
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    // Fallback for single names: First 2 letters
    return name.slice(0, 2).toUpperCase();
  });
}
