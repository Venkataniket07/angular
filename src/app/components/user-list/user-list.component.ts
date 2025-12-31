import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Template handles the view layout: Header, Modal Form (conditionally rendered), and the Grid of User Cards
  template: `
    <div class="user-list-container">
      <header>
        <h1>User Management</h1>
        @if (!isFormVisible()) {
          <button (click)="showAddForm()" class="btn-add">
            <span class="icon">+</span> Add New User
          </button>
        }
      </header>

      <!-- Modal Overlay: Covers the screen when the form is open -->
      @if (isFormVisible()) {
        <div class="modal-overlay" (click)="onOverlayClick($event)">
          <!-- Modal Content: Stops click propagation to prevent closing when clicking inside the form -->
          <div class="modal-content" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>{{ isEditing() ? 'Edit User' : 'Create New User' }}</h2>
            </div>
            
            <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
              <div class="form-section">
                <!-- Name Field -->
                <div class="form-group">
                  <label for="name">Full Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    formControlName="name" 
                    placeholder="e.g. John Doe"
                    [class.invalid]="isFieldInvalid('name')"
                  >
                  @if (isFieldInvalid('name')) {
                    <span class="error-msg">Name is required</span>
                  }
                </div>

                <!-- Username Field -->
                <div class="form-group">
                  <label for="username">Username</label>
                  <input 
                    id="username" 
                    type="text" 
                    formControlName="username" 
                    placeholder="e.g. johndoe123"
                    [class.invalid]="isFieldInvalid('username')"
                  >
                  @if (isFieldInvalid('username')) {
                    <span class="error-msg">Username is required</span>
                  }
                </div>

                <!-- Email Field -->
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input 
                    id="email" 
                    type="email" 
                    formControlName="email" 
                    placeholder="e.g. john@example.com"
                    [class.invalid]="isFieldInvalid('email')"
                  >
                  @if (isFieldInvalid('email')) {
                    <span class="error-msg">Please enter a valid email</span>
                  }
                </div>

                <!-- Phone Field -->
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input 
                    id="phone" 
                    type="text" 
                    formControlName="phone" 
                    placeholder="e.g. 1-234-567-8900"
                    [class.invalid]="isFieldInvalid('phone')"
                  >
                  @if (isFieldInvalid('phone')) {
                    <span class="error-msg">Phone number is required</span>
                  }
                </div>

                <!-- Address Group: Nested form group for structured address data -->
                <div formGroupName="address" class="address-group">
                  <h3>Address Details</h3>
                  
                  <div class="form-group">
                    <label for="street">Street</label>
                    <input 
                      id="street" 
                      type="text" 
                      formControlName="street"
                      [class.invalid]="isAddressFieldInvalid('street')"
                    >
                    @if (isAddressFieldInvalid('street')) {
                      <span class="error-msg">Street is required</span>
                    }
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="suite">Suite / Apt</label>
                      <input id="suite" type="text" formControlName="suite">
                    </div>

                    <div class="form-group">
                      <label for="zipcode">Zipcode</label>
                      <input 
                        id="zipcode" 
                        type="text" 
                        formControlName="zipcode"
                        [class.invalid]="isAddressFieldInvalid('zipcode')"
                      >
                       @if (isAddressFieldInvalid('zipcode')) {
                        <span class="error-msg">Required</span>
                      }
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="city">City</label>
                    <input 
                      id="city" 
                      type="text" 
                      formControlName="city"
                      [class.invalid]="isAddressFieldInvalid('city')"
                    >
                     @if (isAddressFieldInvalid('city')) {
                      <span class="error-msg">City is required</span>
                    }
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button type="button" (click)="cancelForm()" class="btn-cancel">Cancel</button>
                <button type="submit" [disabled]="userForm.invalid" class="btn-save">
                  {{ isEditing() ? 'Save Changes' : 'Create User' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      @if (loading()) {
        <div class="loading">
          <p>Loading users...</p>
        </div>
      }

      <!-- Grid display of user cards -->
      <div class="grid">
        @for (user of users(); track user.id) {
          <app-user-card 
            [user]="user" 
            (onEdit)="editUser($event)"
            (onDelete)="deleteUser($event)"
          />
        }
      </div>
    </div>
  `,
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  // --- State Signals ---
  // Signals are used for fine-grained reactivity. When they change, the view updates automatically.
  users = signal<User[]>([]);          // Holds the list of users
  loading = signal<boolean>(false);     // Tracks loading state for API calls
  
  // --- UI State Signals ---
  isFormVisible = signal<boolean>(false);    // Toggle for Modal visibility
  isEditing = signal<boolean>(false);        // True if we are editing an existing user, False if creating new
  currentUserId = signal<number | null>(null); // Stores the ID of the user being edited

  // --- Form Definition ---
  // The FormGroup that manages the state and validation of the input fields
  userForm: FormGroup;

  constructor() {
    // Initialize the Reactive Form
    // We mirror the structure of the User interface including nested objects like 'address' and 'company'
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: [''],
      // Nested FormGroup for Address
      address: this.fb.group({
        street: ['', Validators.required],
        suite: [''],
        city: ['', Validators.required],
        zipcode: ['', Validators.required],
        geo: this.fb.group({
          lat: ['0'],
          lng: ['0']
        })
      }),
      // Nested FormGroup for Company
      company: this.fb.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      })
    });
  }

  ngOnInit() {
    // Load initial data when component mounts
    this.loadUsers();
  }

  // --- Helpers for Validation in Template ---
  
  /**
   * Checks if a specific top-level field is invalid and has been touched/dirtied.
   * Used to conditionally apply error classes and show error messages.
   */
  isFieldInvalid(fieldName: string): boolean {
    const control = this.userForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /**
   * Checks if a field within the nested 'address' group is invalid.
   */
  isAddressFieldInvalid(fieldName: string): boolean {
    const control = this.userForm.get('address')?.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // --- Actions ---

  /**
   * Handles clicks on the modal background overlay.
   * Closes the form when the user clicks outside the modal content.
   */
  onOverlayClick(event: MouseEvent) {
    this.cancelForm();
  }

  /**
   * Fetches the list of users from the UserService.
   * Updates the 'users' signal with the result.
   */
  loadUsers() {
    this.loading.set(true);
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching users', err);
        this.loading.set(false);
      }
    });
  }

  /**
   * Prepares and shows the form for CREATING a new user.
   * Resets the form and clear the tracking ID.
   */
  showAddForm() {
    this.isEditing.set(false);
    this.currentUserId.set(null);
    this.userForm.reset({
      // Initialize with default empty values for nested objects to prevent null errors
      address: { geo: { lat: '0', lng: '0' } } 
    });
    this.isFormVisible.set(true);
  }

  /**
   * Prepares and shows the form for EDITING an existing user.
   * Populates the form with the user's current data.
   */
  editUser(user: User) {
    this.isEditing.set(true);
    this.currentUserId.set(user.id);
    
    // patchValue automatically maps the User object properties to the form controls
    // because the names match exactly.
    this.userForm.patchValue(user);
    
    this.isFormVisible.set(true);
  }

  /**
   * Closes the form without saving.
   */
  cancelForm() {
    this.isFormVisible.set(false);
    this.userForm.reset();
  }

  /**
   * Main handler for Form Submission.
   * Decides whether to Create or Update based on 'isEditing' state.
   */
  onSubmit() {
    // 1. Check validity
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); // Trigger all validation error messages to show up
      return;
    }

    // 2. Get form data
    const formValue = this.userForm.value;

    if (this.isEditing() && this.currentUserId()) {
      // --- UPDATE FLOW ---
      // We must merge the form data with the original ID because the form doesn't contain the ID field.
      const updatedUser: User = { 
        ...formValue, 
        id: this.currentUserId()! 
      };

      this.userService.updateUser(updatedUser).subscribe({
        next: (res) => {
          // Update the local signal list immutably
          // We replace the old user with the new response
          this.users.update(users => 
            users.map(u => u.id === updatedUser.id ? res : u)
          );
          this.cancelForm();
        },
        error: (err) => console.error('Error updating user', err)
      });
    } else {
      // --- CREATE FLOW ---
      // Prepare object for creation (no ID yet)
      const newUser: Omit<User, 'id'> = formValue;

      this.userService.createUser(newUser).subscribe({
        next: (createdUser) => {
          // NOTE: JSONPlaceholder API always returns ID 11 for new items. 
          // For a real-world feel, we simulate a unique ID if needed so we can interact with it in the UI.
          const safeUser = { 
            ...createdUser, 
            id: createdUser.id || Math.floor(Math.random() * 10000) + 11 
          };
          
          // Prepend the new user to the list
          this.users.update(users => [safeUser, ...users]);
          this.cancelForm();
        },
        error: (err) => console.error('Error creating user', err)
      });
    }
  }

  /**
   * Deletes a user after confirmation.
   */
  deleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    this.userService.deleteUser(id).subscribe(() => {
      // Filter out the deleted user from the local state
      this.users.update(users => users.filter(u => u.id !== id));
    });
  }
}


