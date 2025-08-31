import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMenuItems } from '../../models/IMenuItems';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-menu-bar',
  imports: [ 
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule
],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {
  readonly menuItems: WritableSignal<IMenuItems[]> = signal([]);
  readonly activeIndex: WritableSignal<number> = signal(1);
  ngOnInit() {
    this.menuItems.set([
      {
        label: 'Pedidos',
        icon: 'menu_book',
        route: '/orders',
      },
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
      {
        label: 'Perfil',
        icon: 'person',
        route: '/profile',
      }
    ])
  }

  setActive(index: number) {
    this.activeIndex.set(index);
  }
}
