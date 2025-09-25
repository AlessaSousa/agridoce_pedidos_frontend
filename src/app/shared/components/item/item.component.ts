import { CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { IProduto } from '../../models/IProduto';
import { CartService, ICartItem } from '../../services/cart.service';

@Component({
  selector: 'app-item',
  imports: [
    CommonModule,
    InputNumber,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  private cartService = inject(CartService);
  public item: InputSignal<ICartItem | undefined> = input();

  removeItem(id?: number) {
    this.cartService.removeFromCart(id!)
  }

  updateQuantity(novaQuantidade: number, item: ICartItem) {
    if (novaQuantidade > 0) {
      this.cartService.updateQuantity(novaQuantidade, item.produto)
    } else {
      this.removeItem(item.produto.id)
    }

  }
}
