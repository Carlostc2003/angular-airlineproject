import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AirportInterface } from '../interfaces/airport.interface';
import { uri } from '../../app.component';

@Injectable({providedIn: 'root'})
export class AirportService {
  private http = inject(HttpClient);

  getAirports(): Observable<AirportInterface[]> {
    return this.http.get<AirportInterface[]>(`${uri}api/flights/departures`);
  }
}
