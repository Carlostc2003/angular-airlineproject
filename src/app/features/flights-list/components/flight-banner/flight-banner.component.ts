import {ChangeDetectionStrategy, Component, input } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-flight-banner',
  imports: [
    DatePipe
  ],
  templateUrl: './flight-banner.component.html',
  styleUrl: './flight-banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FlightBannerComponent {
  cityArr = input<string | null>(null);
  cityDep = input<string | null>(null);
  dateArr = input<string | null>(null);
  dateDep = input<string | null>(null);
  isOutbound = input<boolean>(true);
}
