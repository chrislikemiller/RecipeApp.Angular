import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { LoadingButtonComponent, InputComponent, LoadingComponent } from "../../shared/components";
import { AuthService } from "../../services/authService";
import { finalize, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: "app-register",
  template: `
  <div class="align-center d-grid gap-md m-xl">
    <div class="text-primary text-lg">Register new user</div>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="text-sm">
      <app-input 
        label="Email" 
        type="email"
        formControlName="email"
        [required]="true"
        [error]="getFieldError('email')">
      </app-input>

      <app-input 
        label="Name" 
        type="text"
        formControlName="name"
        [required]="true"
        [error]="getFieldError('name')">
      </app-input>

      <app-input 
        label="Password" 
        type="password"
        formControlName="password"
        [required]="true"
        [error]="getFieldError('password')">
      </app-input>
      
      <app-input 
        label="Confirm Password" 
        type="password"
        formControlName="confirmPassword"
        [required]="true"
        [error]="getFieldError('confirmPassword')">
      </app-input>

      @if (message) {
        <div [class]="'message message-' + messageType" class="text-sm p-sm rounded">
          {{ message }}
        </div>
      }
      <app-loading-button 
        type="submit" 
        [disabled]="registerForm.invalid || isLoading"
        [loading]="isLoading">
        Register
      </app-loading-button>
    </form>
  </div>
  `,
  styles: [`
   .message {
      margin: 0.5rem 0;
      padding: 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      transition: all 0.3s ease;
    }
    
    .message-success {
      background-color: #10b981;
      color: white;
      border: 1px solid #059669;
    }
    
    .message-error {
      background-color: #ef4444;
      color: white;
      border: 1px solid #dc2626;
    }
  `],
  imports: [LoadingButtonComponent, InputComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  isLoading = false;
  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  message = '';
  messageType: 'success' | 'error' | '' = '';


  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.authService = authService;
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);

    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }

    if (fieldName === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch'] && field?.touched) {
      return 'Passwords do not match';
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      email: 'Email',
      name: 'Name',
      password: 'Password',
      confirmPassword: 'Confirm Password'
    };
    return labels[fieldName] || fieldName;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.message = '';
      this.messageType = '';

      const formData = this.registerForm.value;
      console.log("Form submitted with data:", {
        email: formData.email,
        password: formData.password
      });

      this.authService
        .register({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          })
        )
        .subscribe({
          next: (response) => {
            console.log("Registration successful in component:", response);
            this.message = 'Registration successful!';
            this.messageType = 'success';
          },
          error: (errorResponse: HttpErrorResponse) => {
            console.error("Registration failed in component:", errorResponse);
            this.message = `Registration failed. ${errorResponse.error.error}`;
            this.messageType = 'error';
          }
        })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}