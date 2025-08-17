import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClass">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'primary';
  @Input() outline = false;

  get badgeClass(): string {
    const classes = ['badge', `badge-${this.variant}`];
    if (this.outline) classes.push('badge-outline');
    return classes.join(' ');
  }
}
