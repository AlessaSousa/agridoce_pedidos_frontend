import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMenuItems } from '../../models/IMenuItems';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-menu-bar',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    BadgeModule
  ],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {
  private router = inject(Router);
  private cartService = inject(CartService);
  readonly menuItems: WritableSignal<IMenuItems[]> = signal([]);
  readonly activeIndex: WritableSignal<number> = signal(1);
  readonly totalItens: WritableSignal<number> = signal(0);
  private authService = inject(AuthService);
  readonly loggedIn: WritableSignal<boolean> = signal(false);

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
      {
        label: 'Carrinho',
        icon: 'shopping_bag',
        route: '/cart',
      },
      {
        label: 'Cardápio',
        icon: 'manage_search',
        route: '/menu',
      },
      this.loggedIn()
        ? { label: 'Perfil', icon: 'person', route: '/profile' }
        : { label: 'Login', icon: 'person', route: '/login' }
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
    })
  }
}
