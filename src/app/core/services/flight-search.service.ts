import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FlightSearchInterface} from '../interfaces/flight-search.interface';
import {uri} from '../../app.component';


@Injectable({providedIn: 'root'})
export class FlightSearchService {
  private readonly http = inject(HttpClient);

  public search(paramsData: FlightSearchInterface): Observable<any[]> {
    const params = new HttpParams()
      .set('departure', paramsData.departure)
      .set('arrival', paramsData.arrival)
      .set('date', paramsData.date)
      .set('seatClass', paramsData.seatClass)
      .set('passengers', paramsData.passengers);

    return this.http.get<any[]>(`${uri}api/flights/search`, { params });
  }
}
