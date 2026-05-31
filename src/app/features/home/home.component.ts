import { Component } from '@angular/core';
import {BannerComponent} from '../../shared/components/banner/banner.component';
import {FlightSearchComponent} from './components/flight-search/flight-search.component';

@Component({
  selector: 'app-home',
  imports: [
    BannerComponent,
    FlightSearchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {}
