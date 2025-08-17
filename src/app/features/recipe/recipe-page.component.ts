import { Component, inject, Input, OnInit, signal, WritableSignal } from "@angular/core";
import { RecipeComponent } from "./recipe.component";
import { defaultQueryParams, emptyPagedList, fromUrlParams, PagedList, PageLink, RecipeFilter, RecipeQueryParams, toUrlParams } from "../models/pageData";
import { Recipe, RecipeService } from "../../services/recipeService";
import { RECIPE_PAGE_CONFIGS, RecipePageConfig } from "./recipe.config";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { tap } from "rxjs";
import { AuthService } from "../../services/authService";
import { ButtonComponent } from "../../shared/components";

@Component({
    selector: 'app-recipe-page',
    template: `
    <div class="d-flex flex-row justify-center">
        <h2 class="material-icons m-xs">{{ config().icon }}</h2>
        <h2>{{ config().title }}</h2>
    </div>
    @if (config().canModifyRecipes) {
        <app-button  (click)="onAddRecipe()">Add Recipe</app-button>
    }
    <!-- <span class="d-flex justify-center m-sm">{{ config().description }}</span> -->

    <app-recipe 
        [pagedRecipes]="pagedRecipes()"
        (filter)="onFilter($event)"
        (favorite)="onFavorite($event)"
        (search)="onSearch($event)"
        (pageChange)="onPageChange($event)">
    </app-recipe>
    `,
    imports: [RecipeComponent, ButtonComponent]
})
export class RecipePageComponent implements OnInit {
    private queryParams: RecipeQueryParams = defaultQueryParams();
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    recipeService = inject(RecipeService);
    authService = inject(AuthService);
    pagedRecipes = signal(emptyPagedList<Recipe>());

    @Input() config!: WritableSignal<RecipePageConfig>;

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.queryParams = fromUrlParams(params);
            this.loadRecipes();
        });
    }

    onAddRecipe() {
        this.router.navigate(['recipes/add']);
    }

    private loadRecipes() {
        this.recipeService.getRecipes(this.config().route, this.queryParams)
            .pipe(tap(result => console.log("loading recipe result at ", this.config().route, result)))
            .subscribe({
                next: pagedList => {
                    console.log("loading paged list: ", pagedList)
                    this.pagedRecipes.set(pagedList)
                },
                error: (err) => {
                    console.error("Error loading recipes:", err);
                    this.pagedRecipes.set(emptyPagedList<Recipe>());
                }
            });
    }


    private updateUrl() {
        const urlParams = toUrlParams(this.queryParams);

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: urlParams,
            queryParamsHandling: 'replace'
        });
    }

    updateQueryParams(params: Partial<RecipeQueryParams>) {
        this.queryParams = { ...this.queryParams, ...params };
        this.updateUrl();
        this.loadRecipes();
    }

    onFilter(recipeFilter: RecipeFilter) {
        this.updateQueryParams({ filter: recipeFilter, currentPage: 1 });
    }

    onSearch(searchText: string) {
        this.updateQueryParams({ searchTerm: searchText, currentPage: 1 });
    }

    onPageChange(page: PageLink) {
        console.log("page change", page);
        this.updateQueryParams({ currentPage: page.queryOptions.currentPage });
    }

    onFavorite(recipe: Recipe) {
        console.log("onFavorite:", recipe);
        const currentUserId = this.authService.getAuthenticatedUser();
        if (!currentUserId)
        {
            console.error("User not logged in");
            return;
        }
        this.recipeService.favoriteRecipe(currentUserId.id, recipe.id).subscribe({
            next: () => {
                console.log("Recipe favorited successfully:", recipe);
                this.pagedRecipes.update((prev) => {
                    const updatedData = prev.data.map((r) =>
                        r.id === recipe.id ? { ...r, isFavorited: true } : r
                    );
                    return { ...prev, data: updatedData };
                });
            },
            error: (err) => {
                console.error("Error favoriting recipe:", err);
            }
        });
    }
}