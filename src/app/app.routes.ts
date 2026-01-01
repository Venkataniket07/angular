import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

/**
 * Application Routes
 * Defines the navigation structure of the app.
 */
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: '**', component: PageNotFoundComponent } // Wildcard route for 404
];
