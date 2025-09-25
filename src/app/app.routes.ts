import { Routes } from '@angular/router';
import { SplashComponent } from './pages/splash/splash.component';
import { MenuComponent } from './pages/menu/menu.component';
import { CartComponent } from './pages/cart/cart.component';
import { DetailsComponent } from './pages/details/details.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './core/authGuard';
export const routes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'cart', component: CartComponent },
    { path: 'detail/:id', component: DetailsComponent },
    { path: 'final', component: CompletedComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
