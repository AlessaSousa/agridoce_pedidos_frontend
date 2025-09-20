import { Injectable } from '@angular/core';
import { IProduto } from '../models/IProduto';
import { BehaviorSubject } from 'rxjs';

export interface ICartItem {
  produto: IProduto;
  quantidade: number;
}

export interface IItemFinalizado {
  pedido: ICartItem[];
  usuario: any;
  total: number
}

@Injectable({
  providedIn: 'root'
})

export class CartService {
  public cartItems: ICartItem[] = [];
  private cartSubject = new BehaviorSubject<ICartItem[]>([]);
  public pedidoFinalizado!: IItemFinalizado;

  cart$ = this.cartSubject.asObservable();

  addToCart(produto: IProduto) {
    const existing = this.cartItems.find(i => i.produto.id === produto.id);
    if (existing) {
      existing.quantidade += 1;
    } else {
      this.cartItems.push({ produto, quantidade: 1 });
      this.cartSubject.next(this.cartItems);
    }
  }

  removeFromCart(produtoId: number) {
    this.cartItems = this.cartItems.filter(i => i.produto.id !== produtoId);
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  getTotal() {
    return this.cartItems.reduce((sum, i) => sum + (i.produto.precoProd * i.quantidade), 0);
  }

  updateQuantity(novaQuantidade: number, item: IProduto) {
    const produto = item;

    if (!produto) return;

    const cartItem = this.cartItems.find(i => i.produto.id === produto.id)

    if (cartItem) {
      if (novaQuantidade <= 0) {
        this.removeFromCart(produto.id);
      } else {
        cartItem.quantidade = novaQuantidade;
        this.cartItems = [...this.cartItems];
      }
    } else if (novaQuantidade > 0) {
      this.addToCart({ ...produto })
    }
  }

  setPedido(pedido: IItemFinalizado) {
    this.pedidoFinalizado = pedido
    this.clearCart();
  }

  getPedido() {
    return this.pedidoFinalizado;
  }
  
}
