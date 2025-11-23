import { Component, effect, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { IMenuItems } from '../../models/IMenuItems';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from "@angular/material/icon";
import { IS_MOBILE } from '../../services/is-mobile.service';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-menu-bar-vertical',
  imports: [
    BadgeModule,
    MenuModule,
    RippleModule,
    AvatarModule,
    RouterModule,
    MatIcon,
    CommonModule
  ],
  templateUrl: './menu-bar-vertical.component.html',
  styleUrl: './menu-bar-vertical.component.scss'
})
export class MenuBarVerticalComponent {
  private router = inject(Router);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  protected isMobile = inject(IS_MOBILE);
  private loadingService = inject(LoadingService);
  private toastService = inject(ToastService)

  readonly menuItems = signal<IMenuItems[]>([]);
  readonly activeIndex = signal<number>(0);
  readonly totalItens = signal<number>(0);

  constructor() {

    effect(() => {
      const currentRoute = this.router.url;

      const index = this.menuItems().findIndex(item =>
        currentRoute.startsWith(item.route)
      );

      console.log('index', index)
      console.log('currente route', currentRoute)
      if (index !== -1) {
        this.activeIndex.set(index);
      }

      if (index === -1 || currentRoute === '/') {
        if (!this.loggedIn) {
          this.router.navigate(['/menu'])
          this.activeIndex.set(1)
        } else {
          this.router.navigate(['/menu'])
          this.activeIndex.set(0)
        }
      }
      console.log('active', this.activeIndex())
      console.log('logged', this.loggedIn)
    });

    effect(() => {
      const isLogged = this.authService.isLogged();

      if (isLogged) {
        this.menuItems.set([
          { label: 'Cardápio', icon: 'manage_search', route: '/menu' },
          { label: 'Carrinho', icon: 'shopping_bag', route: '/cart' },
          { label: 'Sair', icon: 'logout', route: '/logout' },
        ]);
      } else {
        this.menuItems.set([
          { label: 'Login', icon: 'person', route: '/login' },
          { label: 'Cardápio', icon: 'manage_search', route: '/menu' },
          { label: 'Carrinho', icon: 'shopping_bag', route: '/cart' },
        ]);
      }
    });
  }


  get loggedIn() {
    return this.authService.isLogged();
  }

  ngOnInit() {
    this.getItemsCart();
  }

  setActive(index: number) {
    console.log('index activate', index)
    this.activeIndex.set(index);
    if (this.activeIndex() === 2) {
      this.logout()
    }
  }

  getItemsCart() {
    this.cartService.cart$.subscribe(items => {
      this.totalItens.set(items.length);
    });
  }

  logout() {
    this.loadingService.show()
    this.authService.logout()
      .then((res) => {
        this.menuItems.set([
          { label: 'Login', icon: 'person', route: '/login' },

          { label: 'Cardápio', icon: 'manage_search', route: '/menu' },

          { label: 'Carrinho', icon: 'shopping_bag', route: '/cart' },
        ]);
        // this.router.navigate(['/login']);
      })
      .catch(() => {
        this.toastService.showToastError('Erro ao sair da conta.')
      })
      .finally(() => {
        this.loadingService.hide()
      })
  }
}
