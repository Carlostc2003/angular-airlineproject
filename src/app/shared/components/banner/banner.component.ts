import {ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BannerComponent {
  @Input() h1Text = '';
  @Input() pText = '';
  @Input() buttonLink = '';
  @Input() buttonText = '';
  @Input() background = '';
}
