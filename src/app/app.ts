import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/authService';
import {
  ButtonComponent,
} from './shared/components';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('recipe-app');
  authService = inject(AuthService);
  private router = inject(Router);

  searchQuery = '';

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToHome(): void {
    this.router.navigate(['/recipes']);
  }

  navigateToFavorites(): void {
    this.router.navigate(['/recipes/favorites']);
  }

  navigateToMyRecipes(): void {
    this.router.navigate(['/recipes/my']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
