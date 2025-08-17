import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="overlay" class="loading-overlay">
      <div class="loading-content">
        <div [class]="spinnerClass"></div>
        <div *ngIf="text" class="loading-text">{{ text }}</div>
      </div>
    </div>
    
    <div *ngIf="!overlay" [class]="containerClass">
      <div [class]="spinnerClass"></div>
      <span *ngIf="text" class="loading-text">{{ text }}</span>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .loading-inline {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .loading-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 2rem;
    }
  `]
})
export class LoadingComponent {
  @Input() type: 'spinner' | 'dots' = 'spinner';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() text = '';
  @Input() overlay = false;
  @Input() inline = false;

  get spinnerClass(): string {
    return this.type === 'dots' ? 'loading-dots' : 'loading-spinner';
  }

  get containerClass(): string {
    return this.inline ? 'loading-inline' : 'loading-block';
  }
}
