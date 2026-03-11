import { Routes } from '@angular/router';
import { SplashComponent } from './pages/splash/splash.component';
import { CartComponent } from './pages/cart/cart.component';
import { DetailsComponent } from './pages/details/details.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './core/authGuard';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'cart', component: CartComponent },
    { path: 'detail/:id', component: DetailsComponent },
    { path: 'final', component: CompletedComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },


// TODO: MODIFICAR PARA LAZY LOADING 
 
//     { path: '', loadChildren: () => import('./pages/splash/splash.component').then(m => m.SplashComponent) },
//     { path: 'menu', loadChildren: () => import('./pages/menu/menu.component').then(m => m.MenuComponent) },
//     { path: 'cart', loadChildren: () => import('./pages/cart/cart.component').then(m => m.CartComponent) },
//     { path: 'detail/:id', loadChildren: () => import('./pages/details/details.component').then(m => m.DetailsComponent) },
//     { path: 'final', loadChildren: () => import('./pages/completed/completed.component').then(m => m.CompletedComponent), canActivate: [AuthGuard] },
//     { path: 'login', loadChildren: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
//     { path: 'profile', loadChildren: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent), canActivate: [AuthGuard] },
//     { path: '**', redirectTo: '' },
];
