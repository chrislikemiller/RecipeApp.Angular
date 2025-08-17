
export const recipeRoutes = [
    {
        path: 'all',
        loadComponent: () => import('./recipes-dynamic.component').then(m => m.RecipesDynamicComponent),
        data: { pageType: 'all' } as const
    },
    {
        path: 'my',
        loadComponent: () => import('./recipes-dynamic.component').then(m => m.RecipesDynamicComponent),
        data: { pageType: 'my' } as const
    },
    {
        path: 'favorites',
        loadComponent: () => import('./recipes-dynamic.component').then(m => m.RecipesDynamicComponent),
        data: { pageType: 'favorites' } as const
    },
    {
        path: 'add',
        loadComponent: () => import('./add-recipe-page.component').then(m => m.AddRecipePageComponent),
        data: { pageType: 'add' } as const
    },
    {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full' as const
    }
];