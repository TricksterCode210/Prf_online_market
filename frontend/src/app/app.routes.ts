import {Routes} from '@angular/router';
import {authGuard} from './shared/guards/auth.guard'
import {userGuard} from './shared/guards/user.guard'

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: "home", loadComponent: () => import('./home/home.component').then((c)=> c.HomeComponent)},
  {path: "login", loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)},
  {path: "register", loadComponent: () => import('./register/register.component').then((c) => c.RegisterComponent)},
  {path: "buy", loadComponent: () => import('./buy/buy.component').then((c) => c.BuyComponent)},
  {path: "buy/:id", loadComponent: () => import('./details/details.component').then((c) => c.DetailsComponent), canActivate: [authGuard, userGuard('vasarlo')] },
  {path: "sell", loadComponent: () => import('./sell/sell.component').then((c) => c.SellComponent), canActivate: [authGuard, userGuard('elado')] },
  {path: "sell/:id", loadComponent: () => import('./update/update.component').then((c) => c.UpdateComponent), canActivate: [authGuard, userGuard('elado')] },
  {path: "users", loadComponent: () => import('./user-managment/user-managment.component').then((c) => c.UserManagmentComponent), canActivate: [authGuard] },
  {path: '**', redirectTo: 'home'}

]
