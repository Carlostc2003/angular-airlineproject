import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input-counter',
  standalone: true,
  templateUrl: './input-counter.component.html',
  styleUrl: './input-counter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputCounterComponent {
  public readonly label = input<string>('');
  public readonly sublabel = input<string>('');
  public readonly count = input<number>(0);
  public readonly minLimit = input<number>(0);
  public readonly isMaxLimit = input<boolean>(false);

  public readonly onCountChange = output<number>();

  protected increment(): void {
    if (!this.isMaxLimit()) {
      this.onCountChange.emit(this.count() + 1);
    }
  }

  protected decrement(): void {
    if (this.count() > this.minLimit()) {
      this.onCountChange.emit(this.count() - 1);
    }
  }
}
