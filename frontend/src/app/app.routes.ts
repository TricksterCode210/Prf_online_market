import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home.component').then((m) => m.HomeComponent)
    },
  },
  {
    path: 'buy',
    loadComponent: () => {
      return import('./buy/buy.component').then((m) => m.BuyComponent)
    },
  },
  {
    path: 'sell',
    loadComponent: () => {
      return import('./sell/sell.component').then((m) => m.SellComponent)
    },
  },
  {
    path: 'login',
    loadComponent: () => {
      return import('./login/login.component').then((m) => m.LoginComponent)
    },
  },
  {
    path: 'register',
    loadComponent: () => {
      return import('./register/register.component').then((m) => m.RegisterComponent)
    },
  }
];
