import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  protected readonly title = signal('project-airlines-angular');
}

// URI that the entire program will use to call the backend [It is important to specify: "http://" or "https://"]
export const uri = 'http://localhost:8080/';

// Maximum number of passengers per booking
export const maxPassengers = 8;

// Maximum number of months for which flights can be booked from the current date
export const maxMonths = 6;

// It displays the "waiting for server" message to prevent the user from interacting with the frontend
// This is only necessary in backend development mode
export const showStartServer = true;
