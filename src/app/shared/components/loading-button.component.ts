import { ChangeDetectorRef, Component, input, Input, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@Component({
    selector: 'app-loading-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <button 
      [class]="buttonClass + (loading ? ' btn-loading' : '')"
      [disabled]="disabled || loading"
      [type]="type"
      (click)="onClick.emit($event)"
    >
      <span *ngIf="loading" class="loading-spinner"></span>
      <span *ngIf="!loading" class="button-content">
        <ng-content></ng-content>
      </span>
    </button>
  `,
    styles: [`
    :host {
      display: inline-block;
    }
    
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-height: 2.5rem; /* Ensure consistent height */
    }
    
    .loading-spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      color: inherit !important; /* Override any global color: transparent */
    }
    
    .button-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    /* Override global btn-loading styles that conflict */
    button.btn-loading {
      color: inherit !important;
      
      &::after {
        display: none !important; /* Hide global loading spinner */
      }
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingButtonComponent extends ButtonComponent {
    @Input() loading = false;
}
