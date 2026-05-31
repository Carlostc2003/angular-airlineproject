import {ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {LoadingScreenComponent} from '../loading-screen/loading-screen.component';
import {showStartServer} from '../../../app.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgOptimizedImage, LoadingScreenComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent {
  protected readonly showStartServer = showStartServer;
}
