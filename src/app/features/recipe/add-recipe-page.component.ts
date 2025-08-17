
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Recipe, RecipeService } from '../../services/recipeService';
import { AuthService } from '../../services/authService';
import { ButtonComponent, InputComponent, CardComponent, LoadingButtonComponent } from '../../shared/components';

@Component({
    selector: 'app-add-recipe-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        LoadingButtonComponent,
        InputComponent,
        CardComponent
    ],
    templateUrl: './add-recipe-page.component.html',
    styleUrls: ['./add-recipe-page.component.scss']
})
export class AddRecipePageComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private recipeService = inject(RecipeService);
    private authService = inject(AuthService);

    isSubmitting = signal(false);

    recipeForm: FormGroup = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
        difficulty: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
        ingredients: this.fb.array([this.createIngredientControl()]),
        instructions: this.fb.array([this.createInstructionControl()])
    });

    get ingredientsFormArray() {
        return this.recipeForm.get('ingredients') as FormArray;
    }

    get instructionsFormArray() {
        return this.recipeForm.get('instructions') as FormArray;
    }

    private createIngredientControl() {
        return this.fb.control('', [Validators.required]);
    }

    private createInstructionControl() {
        return this.fb.control('', [Validators.required]);
    }

    addIngredient() {
        this.ingredientsFormArray.push(this.createIngredientControl());
    }

    removeIngredient(index: number) {
        if (this.ingredientsFormArray.length > 1) {
            this.ingredientsFormArray.removeAt(index);
        }
    }

    addInstruction() {
        this.instructionsFormArray.push(this.createInstructionControl());
    }

    removeInstruction(index: number) {
        if (this.instructionsFormArray.length > 1) {
            this.instructionsFormArray.removeAt(index);
        }
    }

    getFieldError(fieldName: string): string {
        const field = this.recipeForm.get(fieldName);
        if (field?.invalid && field?.touched) {
            const errors = field.errors;
            console.log("Field errors:", fieldName, errors);
            if (errors?.['required']) return `${fieldName} is required`;
            if (errors?.['minlength']) return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
            if (errors?.['maxlength']) return `${fieldName} must not exceed ${errors['maxlength'].requiredLength} characters`;
            if (errors?.['min']) return `${fieldName} must be at least ${errors['min'].min}`;
            if (errors?.['max']) return `${fieldName} must not exceed ${errors['max'].max}`;
        }
        return '';
    }

    onSubmit() {
        if (this.recipeForm.valid && !this.isSubmitting()) {
            this.isSubmitting.set(true);
            
            const currentUser = this.authService.getAuthenticatedUser();
            if (!currentUser) {
                console.error('User must be authenticated to create a recipe');
                this.isSubmitting.set(false);
                return;
            }

            const formValue = this.recipeForm.value;
            const recipe: Omit<Recipe, 'id' | 'favoritesCount' | 'isFavorited'> = {
                authorId: currentUser.id,
                title: formValue.title.trim(),
                description: formValue.description.trim(),
                difficulty: parseInt(formValue.difficulty),
                ingredients: formValue.ingredients.filter((ing: string) => ing.trim()).map((ing: string) => ing.trim()),
                instructions: formValue.instructions.filter((inst: string) => inst.trim()).map((inst: string) => inst.trim())
            };

            this.recipeService.createRecipe(recipe).subscribe({
                next: (response) => {
                    console.log('Recipe created successfully:', response);
                    this.router.navigate(['/recipes']);
                },
                error: (error) => {
                    console.error('Error creating recipe:', error);
                    this.isSubmitting.set(false);
                }
            });
        } else {
            // Mark all fields as touched to show validation errors
            this.recipeForm.markAllAsTouched();
        }
    }

    onCancel() {
        this.router.navigate(['/recipes']);
    }
}