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
@Component({
  selector: 'app-cart',
  imports: [
    ItemComponent,
    ButtonModule,
    DialogFormComponent,
    FormsModule,
    CommonModule
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
  constructor() {
    // this.activateRoute.params.subscribe(params => {
    //   if(params) {       
    //     this.cart.set({
    //       nome: params['nome'],
    //       valor: params['valor'],
    //       subtitle: params['subtitle'],
    //       ingrediente: params['ingrediente'],
    //       image: params['image'],
    //       quantidade: params['quantidade']
    //     });
    //   } else {
    //     this.cart.set(null)
    //   }
    // })
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
