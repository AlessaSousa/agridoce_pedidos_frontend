import { Injectable, signal, WritableSignal } from '@angular/core';
import { IProduto } from '../models/IProduto';
import { BehaviorSubject } from 'rxjs';
import { ICreatePedido } from '../models/IPedido';

export interface ICartItem {
  produto: IProduto;
  quantidade: number;
}

export interface IItemFinalizado {
  pedido: ICartItem[];
  usuario: any;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'agridoce_cart';

  public cartItems: WritableSignal<ICartItem[]> = signal(this.loadCart());
  private cartSubject = new BehaviorSubject<ICartItem[]>(this.cartItems());
  public pedidoFinalizado!: ICreatePedido;

  cart$ = this.cartSubject.asObservable();

  addToCart(produto: IProduto, quantidade: number = 1) {
    const existing = this.cartItems().find(i => i.produto.id === produto.id);

    if (existing) {
      existing.quantidade += quantidade;
    } else {
      this.cartItems().push({ produto, quantidade });
    }

    this.updateCart();
  }

  removeFromCart(produtoId: number) {
    this.cartItems.set(this.cartItems().filter(i => i.produto.id !== produtoId));
    this.updateCart();
  }

  clearCart() {
    this.cartItems.set([]);
    this.cartSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getTotal() {
    return this.cartItems().reduce(
      (sum, i) => sum + i.produto.precoProd * i.quantidade,
      0
    );
  }

  updateQuantity(novaQuantidade: number, item: IProduto) {
    const produto = item;
    if (!produto) return;

    const cartItem = this.cartItems().find(i => i.produto.id === produto.id);

    if (cartItem) {
      if (novaQuantidade <= 0) {
        this.removeFromCart(produto.id);
      } else {
        cartItem.quantidade = novaQuantidade;
        this.cartItems.set([...this.cartItems()]);
        this.saveCart();
      }
    } else if (novaQuantidade > 0) {
      this.addToCart({ ...produto });
    }
  }

  setPedido(pedido: ICreatePedido) {
    this.pedidoFinalizado = pedido;
    this.clearCart();
  }

  getPedido() {
    return this.pedidoFinalizado;
  }

  getCartTotal() {
    console.log('items cart', this.cartItems());
    return this.cartItems().length;
  }

  private saveCart() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems()));
  }

  private loadCart(): ICartItem[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private updateCart() {
    this.cartItems.set([...this.cartItems()]);
    this.cartSubject.next(this.cartItems());
    this.saveCart();
  }
}
