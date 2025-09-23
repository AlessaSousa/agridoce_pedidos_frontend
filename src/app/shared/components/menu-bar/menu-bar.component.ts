import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMenuItems } from '../../models/IMenuItems';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../../services/cart.service';
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
  readonly totalItens = computed(() => {
    return this.cartService.getCartTotal()
  });

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
      {
        label: 'Perfil',
        icon: 'person',
        route: '/login',
      }
    ])
  }

  setActive(index: number) {
    this.activeIndex.set(index);
  }
}
