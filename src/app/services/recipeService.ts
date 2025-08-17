import { inject, Injectable } from "@angular/core";
import { BackendService } from "./backendService";
import { map, Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { PagedList, RecipeQueryParams } from "../features/models/pageData";

export type Recipe = {
    id: string;
    authorId: string;
    title: string;
    description: string;
    difficulty: number;
    ingredients?: string[];
    instructions: string[];
    favoritesCount: number;
    isFavorited?: boolean;
};

@Injectable({ providedIn: 'root' })
export class RecipeService {
    private backendService: BackendService = inject(BackendService);

    getRecipes(subPath: string, params: RecipeQueryParams) {
        return this.backendService.get<PagedList<Recipe>>(`recipes/${subPath}`, this.toHttpParams(params));
    }

    getRecipeById(id: string) {
        return this.backendService.get<Recipe>(`recipes/${id}`);
    }

    createRecipe(recipe: any) {
        console.log("creating recipe", recipe);
        return this.backendService.post('recipes', recipe);
    }

    updateRecipe(id: string, recipe: any) {
        return this.backendService.put(`recipes/${id}`, recipe);
    }

    deleteRecipe(id: string) {
        return this.backendService.delete(`recipes/${id}`);
    }

    favoriteRecipe(userId: string, recipeId: string) {
        console.log("Favoriting recipe with userId:", userId, "and recipeId:", recipeId);
        return this.backendService.post(`recipes/favorites`, { userId, recipeId });
    }

    unfavoriteRecipe(userId: string, recipeId: string) {
  // todo: target user service? 
          return this.backendService.post(`recipes/favorites`, { userId, recipeId });
    }

    private toHttpParams(queryParams: RecipeQueryParams): HttpParams {
        let params = new HttpParams()
            .set('currentPage', queryParams.currentPage)
            .set('pageSize', queryParams.pageSize);

        if (queryParams.searchTerm) {
            params = params.set('searchTerm', queryParams.searchTerm);
        }
        if (queryParams.filter?.difficulty) {
            params = params.set('difficulty', queryParams.filter.difficulty)
        }
        if (queryParams.filter?.rating) {
            params = params.set('rating', queryParams.filter.rating);
        }

        return params;
    }
}