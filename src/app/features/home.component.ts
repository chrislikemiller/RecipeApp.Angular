// import { Component, inject, OnInit, signal } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { Recipe, RecipeService } from "../services/recipeService";
// import { RecipeComponent } from "./recipe/recipe.component";
// import { Observable, of, tap } from "rxjs";
// import { emptyPagedList, PagedList } from "./models/pageData";
// import { RecipesDynamicComponent } from "./recipe/recipes-dynamic.component";

// @Component({
//   selector: "app-home",
//   template: `
//   <app-recipes-dynamic [pagedRecipes]="pagedRecipes()"></app-recipes-dynamic>
//   `,
//   imports: [CommonModule, RecipesDynamicComponent],
// })
// export class HomeComponent {
//   pagedRecipes = signal<PagedList<Recipe>>(emptyPagedList<Recipe>());

// }