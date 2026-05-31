import {ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {BackendStatusService} from '../../../core/services/backend-status.service';

@Component({
  selector: 'app-loading-screen',
  imports: [],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoadingScreenComponent {
  private statusService = inject(BackendStatusService);
  isVisible = signal<boolean>(true);

  ngOnInit(): void {
    this.pollBackendHealth().then(() => console.log("ok"));
  }

  private async pollBackendHealth(): Promise<void> {
    const retryInterval = 3000;
    let isUp = false;

    while (!isUp) {
      isUp = await this.statusService.checkHealth();
      if (!isUp) await new Promise(resolve => setTimeout(resolve, retryInterval));
    }

    this.isVisible.set(false);
  }
}
