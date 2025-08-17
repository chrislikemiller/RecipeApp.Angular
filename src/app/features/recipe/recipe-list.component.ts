import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { CardComponent, ButtonComponent } from "../../shared/components";
import { Recipe, RecipeService } from "../../services/recipeService";
import { AuthService } from "../../services/authService";

@Component({
  selector: 'app-recipe-list',
  template: `
    @for (recipe of recipes; track recipe.id) {
      <app-card [hasFooterSlot]="true" class="p-sm">
        <h3>{{ recipe.title }}</h3>
        <p>{{ recipe.description }}</p>
        <!-- add difficulty -->
        <!-- add rating -->
        <!-- add image -->
        <div slot="footer" class="d-flex justify-between align-center">
          <app-button variant="ghost" size="sm">View Recipe</app-button>
          <div class="d-flex align-center">
            <app-button 
              variant="ghost" 
              size="sm" 
              (click)="onFavorite(recipe)"
              class="favorite-button"
              [class.favorited]="recipe.isFavorited">
              @if (recipe.favoritesCount > 0) {
                <span class="text-bold">{{ recipe.favoritesCount }}</span>
              }
              <span class="material-icons">{{ recipe.isFavorited ? 'favorite' : 'favorite_border' }}</span>
          </app-button>
          </div>
        </div>
      </app-card>
      }
    `,
  imports: [CommonModule, CardComponent, ButtonComponent],
  styleUrl: './recipe.component.scss'
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] | null = null;
  @Output() favorite = new EventEmitter<Recipe>();

  private recipeService = inject(RecipeService);
  private authService = inject(AuthService);

  onFavorite(recipe: Recipe) {
    const currentUser = this.authService.getAuthenticatedUser();

    if (!currentUser) {
      console.warn("User must be logged in to favorite recipes");
      return;
    }

    if (recipe.isFavorited || false) {
      recipe.favoritesCount = Math.max(0, recipe.favoritesCount - 1);
      recipe.isFavorited = false;
      this.recipeService.unfavoriteRecipe(currentUser.id, recipe.id).subscribe({
        next: () => {
          console.log("Successfully unfavorited recipe:", recipe.title);
        },
        error: (error) => {
          console.error("Failed to unfavorite recipe:", error);
          recipe.favoritesCount++;
          recipe.isFavorited = true;
        }
      });
    } else {
      recipe.favoritesCount++;
      recipe.isFavorited = true;

      this.recipeService.favoriteRecipe(currentUser.id, recipe.id).subscribe({
        next: () => {
          console.log("Successfully favorited recipe:", recipe.title);
        },
        error: (error) => {
          console.error("Failed to favorite recipe:", error);
          recipe.favoritesCount = Math.max(0, recipe.favoritesCount - 1);
          recipe.isFavorited = false;
        }
      });
    }

    this.favorite.emit(recipe);
  }
}