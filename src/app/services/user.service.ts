import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

/**
 * User Service
 * Manages all communication with the backend API regarding User data.
 * Uses Angular's HttpClient to perform CRUD operations.
 */
@Injectable({
  providedIn: 'root' // Makes this service a singleton available throughout the app
})
export class UserService {
  private http = inject(HttpClient);
  // Base URL from environment configuration
  private apiUrl = `${environment.jsonPlaceholderUrl}/users`;

  /**
   * Fetches all users from the API.
   * @returns An Observable array of User objects.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Creates a new user.
   * @param user The user data (excluding ID, which is assigned by the server).
   * @returns An Observable of the created User.
   */
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  /**
   * Updates an existing user.
   * @param user The user object containing the new data and the existing ID.
   * @returns An Observable of the updated User.
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  /**
   * Deletes a user by their ID.
   * @param id The unique identifier of the user to delete.
   * @returns An Observable that completes when the deletion is successful.
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
