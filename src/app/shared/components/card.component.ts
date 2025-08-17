import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClass" (click)="onCardClick()">
      <!-- Card Image Slot -->
      <div *ngIf="hasImageSlot" class="card-image-container">
        <ng-content select="[slot=image]"></ng-content>
      </div>
      
      <!-- Card Header -->
      <div *ngIf="title || subtitle || hasHeaderSlot" class="card-header">
        <div *ngIf="title" class="card-title">{{ title }}</div>
        <div *ngIf="subtitle" class="card-subtitle">{{ subtitle }}</div>
        <ng-content select="[slot=header]"></ng-content>
      </div>
      
      <!-- Card Body -->
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      
      <!-- Card Footer -->
      <div *ngIf="hasFooterSlot" class="card-footer">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .card-image-container {
      overflow: hidden;
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }
    
    .card-image-container ::ng-deep img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }
  `]
})
export class CardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() interactive = false;
  @Input() elevated = false;
  @Input() hasImageSlot = false;
  @Input() hasHeaderSlot = false;
  @Input() hasFooterSlot = false;

  get cardClass(): string {
    const classes = ['card'];
    if (this.interactive) classes.push('card-interactive');
    if (this.elevated) classes.push('card-elevated');
    return classes.join(' ');
  }

  onCardClick(): void {
    if (this.interactive) {
      // Handle card click if needed
    }
  }
}
