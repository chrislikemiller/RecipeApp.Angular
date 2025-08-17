import { Component, inject } from "@angular/core";
import { AuthService, User } from "../services/authService";

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-container">
      <h2>User Profile</h2>
      <div class="profile-details">
        <p><strong>Name:</strong> {{ user?.name }}</p>
      </div>
    </div>
  `
})
export class ProfileComponent {
    private authService = inject(AuthService)
    user : User | undefined;

    constructor() {
        this.authService.currentUser$.subscribe(user => {
            this.user = user;
        });
    }
}
