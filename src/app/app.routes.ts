import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { TestComponent } from './features/test/test.component';
import { ProfileComponent } from './features/profile.component';
import { RecipesDynamicComponent } from './features/recipe/recipes-dynamic.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'test', component: TestComponent },
    { path: 'profile', component: ProfileComponent }, // todo: add auth guard
    {
        path: 'recipes',
        loadChildren: () => import('./features/recipe/recipe.routes').then(m => m.recipeRoutes)
    },
    { path: '', component: RecipesDynamicComponent },
    { path: '**', redirectTo: '' }
];