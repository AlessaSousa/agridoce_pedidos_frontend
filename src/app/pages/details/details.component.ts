import { CommonModule } from '@angular/common';
import { Component, InputSignal, WritableSignal, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Button, ButtonModule } from "primeng/button";
import { ActivatedRoute, Router } from '@angular/router';
import { IProduto, IProdutoWithQuantity, PRODUTOS } from '../../shared/models/IProduto';
import { SharedService } from '../../shared/services/shared.service';
import { CartService } from '../../shared/services/cart.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ToastService } from '../../shared/services/toast.service';
import { CardV2Component } from '../../shared/components/card-v2/card-v2.component';

@Component({
  selector: 'app-item-details',
  imports: [
    CommonModule,
    FormsModule,
    InputNumber,
    ButtonModule,
    CardV2Component
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

  public detail: WritableSignal<IProdutoWithQuantity | undefined> = signal(undefined);
  // public detail = computed(() => {
  //   return {
  //     ...this.detailProduto()!,
  //     quantidade: 1
  //   }
  // })
  public produtoId: WritableSignal<number> = signal(0);
  public products: WritableSignal<IProduto[]> = signal([])
  constructor() {
    this.activateRoute.params.subscribe(params => {
      this.produtoId.set(params['id'])
    })
  }

  ngOnInit() {
    this.getDetailProduto(this.produtoId());
  }

  getDetailProduto(idProduct?: number) {
    this.loadingService.show()
    this.sharedService.getProdutoById(idProduct!)
      .then((res) => {
        this.detail.set({ ...res, quantidade: 1 });
        this.getAllProduct()
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
    // this.router.navigate(['/cart'])
    this.cartService.addToCart(detail);
  }

  addItem(item: IProduto) {
    if (this.detail()?.quantidade) {
      console.log("item quantidade", this.detail()?.quantidade)
    }

    console.log('adicionado ao carrinho', item)
    this.cartService.addToCart(item, this.detail()?.quantidade);
  }

  updateQuantity(novaQuantidade: number, item: IProduto) {
    // if (novaQuantidade > 0) {
    //   this.cartService.updateQuantity(novaQuantidade, item)
    // }
    this.detail.set({...this.detail()!, quantidade:  novaQuantidade})
    console.log("item adicionado", novaQuantidade, item)
  }

  getAllProduct() {
    this.loadingService.show()
    this.sharedService.getProduto()
      .then((res) => {
        this.products.set(
          res.filter(p => p.categoriaNome === this.detail()?.categoriaNome && p.id !== this.detail()?.id)
        );
      })
      .catch((err) => {
        this.toastService.showToastError('Erro ao buscar listagem de produtos.')
      })
      .finally(() => {
        this.loadingService.hide()
      })
  }

  getProductById(idProduct: number) {
    this.router.navigate(['detail', idProduct])
    this.getDetailProduto(idProduct)
  }
}
