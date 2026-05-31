import {Component, OnInit, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { FlightSearchService } from '../../core/services/flight-search.service';
import {CommonModule} from '@angular/common';
import {FlightBannerComponent} from './components/flight-banner/flight-banner.component';

@Component({
  selector: 'app-flights-list',
  imports: [CommonModule, RouterModule, FlightBannerComponent],
  templateUrl: './flights-list.component.html',
  styleUrl: './flights-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class FlightsListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly flightApi = inject(FlightSearchService);
  protected readonly departure = signal<string | null>(null);
  protected readonly arrival = signal<string | null>(null);
  protected readonly startDate = signal<string | null>(null);
  protected readonly endDate = signal<string | null>(null);
  protected readonly type = signal<string | null>(null);
  protected readonly passengers = signal<any>(null);
  protected readonly seatClass = signal<string | null>(null);
  protected readonly loading = signal<boolean>(false);
  protected readonly outboundFlights = signal<any[]>([]);
  protected readonly inboundFlights = signal<any[]>([]);
  protected readonly currentStep = signal<'outbound' | 'inbound'>('outbound');
  protected readonly selectedOutboundFlight = signal<any | null>(null);
  protected readonly selectedInboundFlight = signal<any | null>(null);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.departure.set(params.get('from'));
      this.arrival.set(params.get('to'));
      this.startDate.set(params.get('start'));
      this.endDate.set(params.get('end'));
      this.type.set(params.get('type'));
      this.seatClass.set(params.get('seatClass'));
      const p = params.get('passengers');
      if (p) {
        try { this.passengers.set(JSON.parse(p)); }
        catch (e) { console.error('Error al parsear los pasajeros', e); }
      }

      this.loadAvailableFlights();
    });
  }

  private loadAvailableFlights(): void {
    const from = this.departure();
    const to = this.arrival();
    const start = this.startDate();
    const sc = this.seatClass();
    if (!from || !to || !start || !sc) return;
    this.loading.set(true);

    const cleanStart = `${start.split('T')[0]}T00:00:00.000Z`;

    this.flightApi.search({
      departure: from,
      arrival: to,
      date: cleanStart,
      seatClass: sc,
      passengers: JSON.stringify(this.passengers())
    }).subscribe({
      next: (flights) => {
        this.outboundFlights.set(flights);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });

    const end = this.endDate();
    if (this.type() === 'round trip' && end) {
      const cleanEnd = `${end.split('T')[0]}T00:00:00.000Z`;

      this.flightApi.search({
        departure: to,
        arrival: from,
        date: cleanEnd,
        seatClass: sc,
        passengers: JSON.stringify(this.passengers())
      }).subscribe({
        next: (flights) => this.inboundFlights.set(flights),
        error: (err) => console.error(err)
      });
    }
  }

  protected selectOutbound(flight: any): void {
    this.selectedOutboundFlight.set(flight);
    if (this.type() === 'round trip' && this.inboundFlights().length > 0) {
      this.currentStep.set('inbound');
    } else {
      this.proceedToCheckout();
    }
  }

  protected selectInbound(flight: any): void {
    this.selectedInboundFlight.set(flight);
    this.proceedToCheckout();
  }

  private proceedToCheckout(): void {
    console.log('Procediendo al pago con los siguientes vuelos:', {
      outbound: this.selectedOutboundFlight(),
      inbound: this.selectedInboundFlight()
    });
  }
}
