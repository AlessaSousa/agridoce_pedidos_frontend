import { Component, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from "./shared/components/loading/loading.component";
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuBarComponent,
    CommonModule,
    ToastModule,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private router = inject(Router);
  title = 'agridoce_pedidos';
  public showNavBar: WritableSignal<boolean> = signal(false);
  protected isMobile: WritableSignal<boolean> = signal(false);

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.isMobile.set(window.innerWidth < 768)
  }

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavBar.set(['/menu', '/cart', '/profile'].includes(event.urlAfterRedirects))
      }
    })
  }
}
