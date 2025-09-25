import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ItemComponent } from '../../shared/components/item/item.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogFormComponent } from '../../shared/components/dialog-form/dialog-form.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService, ICartItem } from '../../shared/services/cart.service';
import { LoadingService } from '../../shared/services/loading.service';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-cart',
  imports: [
    ItemComponent,
    ButtonModule,
    DialogFormComponent,
    FormsModule,
    CommonModule,
    MatIcon
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private activateRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private loadingService = inject(LoadingService);

  public visible: WritableSignal<boolean> = signal(false);
  public cart: WritableSignal<any | null> = signal(null);

  public cartItems: WritableSignal<ICartItem[]> = signal([]);
  public total: number = 0;
  readonly isLogged: WritableSignal<string> = signal('');
  constructor() {
    const isLogged = localStorage.getItem('isLogged')
    this.isLogged.set(isLogged!)
  }

  ngOnInit() {
    this.getItemsCart()
  }

  showModal() {
    this.visible.set(true);
  }

  closeDialog() {
    this.visible.set(false);
  }

  getItemsCart() {
    this.loadingService.show()
    this.cartService.cart$.subscribe(items => {
      this.cartItems.set(items);
      this.total = this.cartService.getTotal();
    })
    this.loadingService.hide()
  }

}
