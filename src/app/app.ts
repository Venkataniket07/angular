import { Component } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';

/**
 * Root Component
 * This is the entry point of the application's view hierarchy.
 * It currently renders the UserListComponent which handles the main functionality.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Logic for the root component would go here.
}
