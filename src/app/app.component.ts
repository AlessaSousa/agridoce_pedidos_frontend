import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    MenuBarComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private router = inject(Router);
  title = 'agridoce_pedidos';
  public showNavBar: WritableSignal<boolean> = signal(false);

  constructor() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.showNavBar.set(['/menu', '/cart'].includes(event.urlAfterRedirects))
      }
    })
  }
}
