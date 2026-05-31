import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})

export class InputComponent implements ControlValueAccessor {
  svg = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  text = input<string>('');
  width = input<string>('100%');
  height = input<string>('');
  fontSize = input<string>('1.5rem');
  protected value = model<string>('');
  protected isDisabled = model<boolean>(false);

  private onChange = (_value: string) => {};
  private onTouched = () => {};
  protected handleBlur(): void {this.onTouched();}
  writeValue(value: string): void {this.value.set(value || '');}
  registerOnChange(fn: any): void {this.onChange = fn;}
  registerOnTouched(fn: any): void {this.onTouched = fn;}
  setDisabledState(isDisabled: boolean): void {this.isDisabled.set(isDisabled);}
  protected handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }
}
