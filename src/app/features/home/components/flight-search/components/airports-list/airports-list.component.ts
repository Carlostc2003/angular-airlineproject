import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, OnInit, computed, inject, output, signal } from '@angular/core';
import { AirportService } from '../../../../../../core/services/airport.service';
import { AirportInterface } from '../../../../../../core/interfaces/airport.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-airports-list',
  imports: [],
  templateUrl: './airports-list.component.html',
  styleUrl: './airports-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AirportsListComponent implements OnInit {
  private readonly as = inject(AirportService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);

  private readonly allAirports = signal<AirportInterface[]>([]);

  public readonly filterQuery = signal<string>('');
  public readonly loading = signal<boolean>(true);

  public readonly isOpen = computed(() => this.filterQuery().trim().length > 0);

  public readonly airports = computed(() => {
    const query = this.filterQuery().toLowerCase().trim();
    const list = this.allAirports();
    if (!query) return list;
    return list.filter(a =>
      a.airport_code.toLowerCase().startsWith(query) ||
      a.city_airport.toLowerCase().startsWith(query)
    );
  });

  public readonly onSelectAirport = output<AirportInterface>();

  @HostListener('document:click', ['$event'])
  protected handleClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.filterQuery.set('');
    }
  }

  public ngOnInit(): void {
    this.as.getAirports()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.allAirports.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }

  protected selectAirport(airport: AirportInterface): void {
    this.onSelectAirport.emit(airport);
    this.filterQuery.set('');
  }
}
