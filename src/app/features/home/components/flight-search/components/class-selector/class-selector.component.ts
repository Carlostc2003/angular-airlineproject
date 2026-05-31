import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, signal, effect } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputCounterComponent } from './components/input-counter/input-counter.component';
import { maxPassengers } from '../../../../../../app.component';

@Component({
  selector: 'app-class-selector',
  imports: [
    InputCounterComponent
  ],
  templateUrl: './class-selector.component.html',
  styleUrl: './class-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClassSelectorComponent,
      multi: true
    }
  ]
})
export class ClassSelectorComponent implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef);
  public readonly show = signal<boolean>(false);
  public readonly adults = signal<number>(1);
  public readonly children = signal<number>(0);
  public readonly infants = signal<number>(0);
  public readonly nameClass = signal<string>('Economy');

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  public readonly totalPassengers = computed(() =>
    this.adults() + this.children() + this.infants()
  );

  public readonly isMaxReached = computed(() =>
    this.totalPassengers() >= maxPassengers
  );

  constructor() {
    effect(() => {
      const value = {
        class: this.nameClass(),
        passengers: {
          adults: this.adults(),
          children: this.children(),
          infants: this.infants()
        }
      };
      this.onChange(value);
    });
  }

  protected showClassSelector(): void {
    this.show.update(value => !value);
  }

  @HostListener('document:click', ['$event'])
  protected onClickOutside(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      if (this.show()) this.onTouched();
      this.show.set(false);
    }
  }

  public writeValue(obj: any): void {
    if (obj) {
      if (obj.class) this.nameClass.set(obj.class);
      if (obj.passengers) {
        if (obj.passengers.adults !== undefined) this.adults.set(obj.passengers.adults);
        if (obj.passengers.children !== undefined) this.children.set(obj.passengers.children);
        if (obj.passengers.infants !== undefined) this.infants.set(obj.passengers.infants);
      }
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
