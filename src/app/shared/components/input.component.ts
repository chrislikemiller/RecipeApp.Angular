import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="form-group">
      <label *ngIf="label" class="form-label" [for]="id">
        {{ label }}
        <span *ngIf="required" class="text-error">*</span>
      </label>
      
      <input
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [class]="inputClass"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
      />
      
      <div *ngIf="error" class="form-error">
        <span class="material-icons">error</span>
        {{ error }}
      </div>
      
      <div *ngIf="helper && !error" class="form-helper">
        {{ helper }}
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() error = '';
  @Input() helper = '';
  @Input() required = false;
  @Input() disabled = false;

  value = '';
  
  private onChange = (value: string) => {};
  private onTouched = () => {};

  get inputClass(): string {
    const classes = [`form-input`, `input-${this.size}`];
    if (this.error) classes.push('input-error');
    return classes.join(' ');
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {
    // Handle focus if needed
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
