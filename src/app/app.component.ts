import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { IS_MOBILE } from './shared/services/is-mobile.service';
import { MenuComponent } from "./pages/menu/menu.component";
import { MenuBarComponent } from "./shared/components/menu-bar/menu-bar.component";
import { MenuBarVerticalComponent } from "./shared/components/menu-bar-vertical/menu-bar-vertical.component";
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ToastModule,
    LoadingComponent,
    RouterOutlet,
    MenuComponent,
    MenuBarComponent,
    MenuBarVerticalComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  private router = inject(Router);
  title = 'agridoce_pedidos';
  public showNavBar: WritableSignal<boolean> = signal(false);
  protected isMobile = inject(IS_MOBILE);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavBar.set(['/menu', '/cart', '/profile'].includes(event.urlAfterRedirects))
      }
    })
  }
}
