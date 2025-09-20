import { CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IProduto } from '../../models/IProduto';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-card',
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  private cartService = inject(CartService);
  public card: InputSignal<IProduto | undefined> = input();

  addItem(item: IProduto) {
    this.cartService.addToCart(item);
  }

  showDetail(item: IProduto) {
    
  }
}
