import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { uri } from '../../app.component';
import {BackendStatusInterface} from '../interfaces/backend-status.interface';

@Injectable({providedIn: 'root'})
export class BackendStatusService {
  private http = inject(HttpClient);

  async checkHealth(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.get<BackendStatusInterface>(`${uri}actuator/health`)
      );
      return response?.status === 'UP';
    }
    catch {
      return false;
    }
  }
}
