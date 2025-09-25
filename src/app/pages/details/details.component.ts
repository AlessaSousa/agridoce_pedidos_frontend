import { CommonModule } from '@angular/common';
import { Component, InputSignal, WritableSignal, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Button, ButtonModule } from "primeng/button";
import { ActivatedRoute, Router } from '@angular/router';
import { IProduto, PRODUTOS } from '../../shared/models/IProduto';
import { SharedService } from '../../shared/services/shared.service';
import { CartService } from '../../shared/services/cart.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-item-details',
  imports: [
    CommonModule,
    FormsModule,
    InputNumber,
    ButtonModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  private sharedService = inject(SharedService);
  private cartService = inject(CartService);
  private loadingService = inject(LoadingService);
  private toastService = inject(ToastService);

  public detailProduto: WritableSignal<IProduto | undefined> = signal(undefined);
  public detail = computed(() => {
    return {
      ...this.detailProduto()!,
      quantidade: 0
    }
  })
  public produtoId: WritableSignal<number> = signal(0);

  constructor() {
    this.activateRoute.params.subscribe(params => {
      this.produtoId.set(params['id'])
    })
  }

  ngOnInit() {
    this.getDetailProduto()
  }

  getDetailProduto() {
    this.loadingService.show()
    this.sharedService.getProdutoById(this.produtoId())
    .then((res) => {
      this.detailProduto.set(res)
    })
    .catch((err) => {
      this.toastService.showToastError('Erro ao buscar detalhes do produto')
    })
    .finally(() => {
      this.loadingService.hide()
    })
  }

  goToMenu() {
    this.router.navigate(['/menu'])
  }

  goToCart(detail: IProduto) {
    this.router.navigate(['/cart'])
    // this.cartService.addToCart(detail);
  }

  addItem(item: IProduto) {
    this.cartService.addToCart(item);
  }

  updateQuantity(novaQuantidade: number, item: IProduto) {
    if(novaQuantidade > 0) {
      this.cartService.updateQuantity(novaQuantidade, item)
    }
  }
}
