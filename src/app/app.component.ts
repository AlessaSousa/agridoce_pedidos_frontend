import { Component, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { MenuBarVerticalComponent } from './shared/components/menu-bar-vertical/menu-bar-vertical.component';
import { IS_MOBILE } from './shared/services/is-mobile.service';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuBarComponent,
    CommonModule,
    ToastModule,
    LoadingComponent,
    MenuBarVerticalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
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
