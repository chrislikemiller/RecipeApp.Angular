import { Component, inject, Input, OnInit, signal } from "@angular/core";
import { Recipe } from "../../services/recipeService";
import { RecipePageComponent } from "./recipe-page.component";
import { ActivatedRoute } from "@angular/router";
import { RECIPE_PAGE_CONFIGS, RecipePageConfig } from "./recipe.config";

@Component({
    selector: 'app-recipes-dynamic',
    template: `
    @if (config()) {
        <app-recipe-page [config]="config"></app-recipe-page>
    }
    @else {
        <div>Recipe page does not exist</div>
    }
    `,
    imports: [RecipePageComponent]
})
export class RecipesDynamicComponent implements OnInit {
    private route = inject(ActivatedRoute);
    @Input() config = signal<RecipePageConfig>(RECIPE_PAGE_CONFIGS['all']);

    ngOnInit() {
        this.route.data.subscribe(data => {
            console.log('Dynamic route data:', data);
            const routeKey = data['pageType'] as keyof typeof RECIPE_PAGE_CONFIGS;
            const config = RECIPE_PAGE_CONFIGS[routeKey]
            if (routeKey && config) {
                this.config.set(config);
            }
            else {
                this.config.set(RECIPE_PAGE_CONFIGS['all']);
            }
        });
    }
}