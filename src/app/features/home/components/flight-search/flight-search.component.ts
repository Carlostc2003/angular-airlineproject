import { Component, OnInit, ChangeDetectionStrategy, signal, viewChild, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AirportsListComponent } from './components/airports-list/airports-list.component';
import { AirportInterface } from '../../../../core/interfaces/airport.interface';
import { ClassSelectorComponent } from './components/class-selector/class-selector.component';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    InputComponent,
    CalendarComponent,
    AirportsListComponent,
    ClassSelectorComponent,
  ],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FlightSearchComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  protected readonly al = viewChild(AirportsListComponent);
  protected readonly currentTab = signal('booking');
  protected readonly tripType = signal('round trip');

  protected readonly bookingForm = new FormGroup({
    departure: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    arrival: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    calendar: new FormControl({ start: null, end: null }),
    classAndPassengers: new FormControl({
      class: 'Economy',
      passengers: { adults: 1, children: 0, infants: 0 }
    })
  });

  protected readonly checkinForm = new FormGroup({
    booking: new FormControl('', Validators.required),
  });

  protected readonly manageForm = new FormGroup({});

  ngOnInit(): void {
    this.bookingForm.controls.departure.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.updateAirportFilter(value));
  }

  protected updateAirportFilter(value: string): void {
    const list = this.al();
    if (list) list.filterQuery.set(value);
  }

  protected handleAirportSelection(airport: AirportInterface): void {
    this.bookingForm.controls.departure.setValue(airport.airport_code);
  }

  protected swapAirports(): void {
    const { departure, arrival } = this.bookingForm.controls;
    const dep = departure.value;
    const arr = arrival.value;
    if (dep && arr) {departure.setValue(arr); arrival.setValue(dep);}
  }

  protected submitForm(): void {console.log("ok");}

  protected printSelection(): void {
    const f = this.bookingForm.getRawValue();
    const startRaw = f.calendar?.start;
    const endRaw = f.calendar?.end;

    const formatToCleanUTC = (rawDate: any): string | null => {
      if (!rawDate) return null;
      const date = new Date(rawDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}T00:00:00.000Z`;
    };

    const sd = formatToCleanUTC(startRaw);
    const ed = formatToCleanUTC(endRaw);

    console.log(
      `
      Desde: ${f.departure}
      Hasta: ${f.arrival}
      Fechas: ${sd} -> ${ed}
      Pasajeros: ${f.classAndPassengers?.passengers?.adults}
      Clase: ${f.classAndPassengers?.class}
      `);

    this.router.navigate(['/flights-list'], {
      queryParams: {
        from: f.departure.toUpperCase(),
        to: f.arrival.toUpperCase(),
        start: sd,
        end: ed,
        type: this.tripType(),
        passengers: JSON.stringify(f.classAndPassengers?.passengers),
        seatClass: f.classAndPassengers?.class.toUpperCase()
      }
    }).then(r => console.log(r));
  }

  protected changeTab(value: string): void {
    this.currentTab.set(value);
    console.log('Tab cambiado:', value);
  }

  protected isSearchDisabled(): boolean {
    if (this.currentTab() === 'booking') {
      const controls = this.bookingForm.controls;
      const isRouteInvalid = controls.departure.invalid || controls.arrival.invalid;
      const calendarValues = controls.calendar.value;
      const isCalendarInvalid = !calendarValues || !calendarValues.start ||
        (this.tripType() === 'round trip' && !calendarValues.end);
      return isRouteInvalid || isCalendarInvalid;
    }

    if (this.currentTab() === 'checkin') return this.checkinForm.invalid;
    if (this.currentTab() === 'manage') return this.manageForm.invalid;

    return true;
  }
}
