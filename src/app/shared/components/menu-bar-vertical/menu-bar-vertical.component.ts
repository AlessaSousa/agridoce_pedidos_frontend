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
@Component({
  selector: 'app-menu-bar-vertical',
  imports: [
    BadgeModule,
    MenuModule,
    RippleModule,
    AvatarModule,
    RouterModule,
    MatIcon
],
  templateUrl: './menu-bar-vertical.component.html',
  styleUrl: './menu-bar-vertical.component.scss'
})
export class MenuBarVerticalComponent {
  private router = inject(Router);
  private cartService = inject(CartService);
  readonly menuItems: WritableSignal<IMenuItems[]> = signal([]);
  readonly activeIndex: WritableSignal<number> = signal(1);
  readonly totalItens: WritableSignal<number> = signal(0);
  private authService = inject(AuthService);
  readonly loggedIn: WritableSignal<boolean> = signal(false);
  protected isMobile = inject(IS_MOBILE);

  constructor() {
    effect(() => {
      const currentRoute = this.router.url;
      const index = this.menuItems().findIndex(item => currentRoute.startsWith(item.route));
      if (index !== -1) {
        this.activeIndex.set(index);
      }
    })
  }

  ngOnInit() {
    this.loggedIn.set(this.authService.isLogged());
    this.menuItems.set([
      this.loggedIn()
        ? { label: 'Perfil', icon: 'person', route: '/profile' }
        : { label: 'Login', icon: 'person', route: '/login' },
      {
        label: 'Cardápio',
        icon: 'manage_search',
        route: '/menu',
      },
      {
        label: 'Carrinho',
        icon: 'shopping_bag',
        route: '/cart',
      },
    ]);
    this.getItemsCart();
  }

  setActive(index: number) {
    this.activeIndex.set(index);
    console.log('index', this.activeIndex())
  }

  getItemsCart() {
    this.cartService.cart$.subscribe(items => {
      this.totalItens.set(items.length)
      console.log('item lengh', this.totalItens())
    })
  }
}
