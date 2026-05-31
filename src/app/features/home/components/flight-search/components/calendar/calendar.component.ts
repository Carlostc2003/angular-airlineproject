import { ChangeDetectionStrategy, Component, DestroyRef, forwardRef, inject, input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import { MatFormField, MatInput, MatSuffix } from "@angular/material/input";
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {maxMonths} from '../../../../../../app.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FormsModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatEndDate,
    MatFormField,
    MatStartDate,
    MatSuffix,
    ReactiveFormsModule,
    MatInput,
    MatDatepickerInput,
    MatDatepicker
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CalendarComponent), multi: true },
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class CalendarComponent implements ControlValueAccessor, OnInit {
  private readonly destroyRef = inject(DestroyRef);
  public type = input<string>('one way');
  protected readonly today = new Date();
  protected readonly maxDate = new Date(new Date().setMonth(new Date().getMonth() + maxMonths));
  protected readonly internalForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });

  private onChange = (_value: any) => {};
  private onTouched = () => {};
  protected handleBlur(): void {this.onTouched();}
  public registerOnChange(fn: any): void {this.onChange = fn;}
  public registerOnTouched(fn: any): void {this.onTouched = fn;}
  public ngOnInit(): void {
    this.internalForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => this.onChange(val));
  }

  public writeValue(value: any): void {
    if (value) {
      this.internalForm.setValue({
        start: value.start || null,
        end: value.end || null
      }, { emitEvent: false });
    }
    else this.internalForm.setValue({ start: null, end: null }, { emitEvent: false });
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) this.internalForm.disable({ emitEvent: false });
    else this.internalForm.enable({ emitEvent: false });
  }

  protected dateClass = (date: Date): string => {
    const currentToday = new Date();
    currentToday.setHours(0, 0, 0, 0);
    return date < currentToday ? 'past-day' : '';
  };
}
