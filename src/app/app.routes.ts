import { Routes } from '@angular/router';
import { SplashComponent } from './pages/splash/splash.component';
import { MenuComponent } from './pages/menu/menu.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', redirectTo: '' }
];
