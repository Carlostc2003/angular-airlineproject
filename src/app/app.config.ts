import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {provideRouter, TitleStrategy} from '@angular/router';
import { routes } from './app.routes';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {provideHttpClient} from '@angular/common/http';
import {AppTitleStrategy} from './core/configuration/app-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), {provide: TitleStrategy, useClass: AppTitleStrategy},
    provideHttpClient(),
    provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
};
