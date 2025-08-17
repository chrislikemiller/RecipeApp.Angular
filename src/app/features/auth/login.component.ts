import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { LoadingButtonComponent, InputComponent } from "../../shared/components";
import { Router } from "@angular/router";
import { AuthService } from "../../services/authService";
import { finalize } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  template: `
  <div class="align-center d-grid gap-md m-xl">
    <div class="text-primary text-lg">Login</div>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="text-sm">
      <app-input 
        label="Email" 
        type="email"
        formControlName="email"
        [required]="true"
        [error]="getFieldError('email')">
      </app-input>
      
      <app-input 
        label="Password" 
        type="password"
        formControlName="password"
        [required]="true"
        [error]="getFieldError('password')">
      </app-input>

      @if (message) {
        <div [class]="'message message-' + messageType" class="text-sm p-sm rounded">
          {{ message }}
        </div>
      }
 
      <app-loading-button 
        type="submit" 
        [disabled]="loginForm.invalid || isLoading"
        [loading]="isLoading">
        Login
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
  imports: [LoadingButtonComponent, InputComponent, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  isLoading = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef) {
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);

    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      email: 'Email',
      password: 'Password'
    };
    return labels[fieldName] || fieldName;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.message = '';
      this.messageType = '';

      const formData = this.loginForm.value;
      console.log("Login submitted with data:", {
        email: formData.email,
        password: '***'
      });

      this.authService
        .login(formData.email, formData.password)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            console.log('Finalized: isLoading is ', this.isLoading);
            this.cdr.detectChanges();
          })
        )
        .subscribe({
          next: (response) => {
            if (response) {
              console.log('Login successful:', response);
              this.message = 'Login successful! Redirecting...';
              this.messageType = 'success';
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 500); // Small delay to show success message
            }
            else {
              console.log('Login failed:', response);
              this.message = 'Login failed. Please check your credentials and try again.';
              this.messageType = 'error';
            }
          },
          error: (error) => {
            console.error('Login failed:', error);
            this.message = 'Login failed. Please check your credentials and try again.';
            this.messageType = 'error';
          },
        });
    } else {
      this.loginForm.markAllAsTouched(); // trigger validation errors
    }
  }
}