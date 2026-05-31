import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: `Inicio`
  },
  {
    path: 'explore',
    loadComponent: () => import('./features/explore/explore.component'),
    title: `Explorar`
  },
  {
    path: 'check-in',
    loadComponent: () => import('./features/checkin/checkin.component'),
    title: `Check-in`
  },
  {
    path: 'fidelity',
    loadComponent: () => import('./features/fidelity/fidelity.component'),
    title: `Fidelidad`
  },
  {
    path: 'help',
    loadComponent: () => import('./features/help/help.component'),
    title: `Ayuda`
  },
  {
    path: 'flights-list',
    loadComponent: () => import('./features/flights-list/flights-list.component'),
    title: `Vuelos`
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
