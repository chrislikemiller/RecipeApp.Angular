import { Component, EventEmitter, inject, Input, Output, Signal, signal } from "@angular/core";
import { Recipe } from "../../services/recipeService";
import { RecipeListComponent } from "./recipe-list.component";
import { ButtonComponent } from "../../shared/components/button.component";
import { emptyPagedList, PagedList, PageLink, RecipeFilter } from "../models/pageData";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject, debounce, debounceTime, distinctUntilChanged, map } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-recipe',
    template: `
        <div class="mx-lg">
            <div class="d-flex align-center w-full border border-primary rounded p-sm gap-sm mb-lg">
                <span class="material-icons text-hint">search</span>
                <input type="text"
                    class="search-input flex-1 text-primary text-base bg-transparent border-0 p-0"
                    style="outline: none;"
                    placeholder="Search recipes..."
                    [(ngModel)]="searchQuery"
                    (ngModelChange)="onSearchChange()"
                    />
            </div>
            <div class="filter-container">
            </div>
        </div>

        <span class="text-primary m-sm font-light">{{ pagedRecipes.metadata.totalCount }} recipes</span>
        <app-recipe-list class="p-xs" 
            [recipes]="pagedRecipes.data"
            (favorite)="onFavorite($event)">
        </app-recipe-list>

        <div class="d-flex align-center justify-center gap-md my-lg">
            <app-button (click)="prevPage()" [disabled]="!pagedRecipes.links.previous"> <<< </app-button>
            <span class="text-primary">Page {{ pagedRecipes.metadata.currentPage }} of {{ pagedRecipes.metadata.totalPages }}</span>
            <app-button (click)="nextPage()" [disabled]="!pagedRecipes.links.next"> >>> </app-button>
        </div>
  `,
    styleUrls: ["recipe.component.scss"],
    imports: [RecipeListComponent, ButtonComponent, FormsModule]
})
export class RecipeComponent {
    private searchSubject = new BehaviorSubject<string>('');
    searchQuery: string = '';
    filterState: RecipeFilter = {};

    @Input() pagedRecipes: PagedList<Recipe> = emptyPagedList<Recipe>();

    @Output() search = new EventEmitter<string>();
    @Output() favorite = new EventEmitter<Recipe>();
    @Output() filter = new EventEmitter<RecipeFilter>();
    @Output() pageChange = new EventEmitter<PageLink>();

    constructor() {
        this.searchSubject
            .pipe(
                map((text) => text.trim()),
                distinctUntilChanged(),
                debounceTime(300),
                takeUntilDestroyed(),
            )
            .subscribe((trimmed) => {
                this.search.emit(trimmed);
            });
    }

    prevPage() {
        console.log("navigating prev", this.pagedRecipes);
        const prev = this.pagedRecipes.links.previous;
        if (prev) {
            this.pageChange.emit(prev);
        }
    }

    filterChange() {
        this.filter.emit(this.filterState);
    }

    nextPage() {
        console.log("navigating next", this.pagedRecipes);
        const next = this.pagedRecipes.links.next;
        if (next) {
            this.pageChange.emit(next);
        }
    }

    onSearchChange() {
        this.searchSubject.next(this.searchQuery);
    }

    onFavorite(recipe: Recipe) {
        this.favorite.emit(recipe);
    }
}