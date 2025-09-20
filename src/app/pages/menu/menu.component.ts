import { Component, WritableSignal, inject, signal } from '@angular/core';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { SharedService } from '../../shared/services/shared.service'
import { LoadingService } from '../../shared/services/loading.service';
import { ToastService } from '../../shared/services/toast.service';
import { IProduto } from '../../shared/models/IProduto';

interface ICategories {
  nome: string;
  outlined: boolean;
  icon: string;
}
interface IItems {
  nome: string;
  valor: number;
  image?: string;
}
@Component({
  selector: 'app-menu',
  imports: [
    InputIcon,
    IconField,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CardComponent,
    CommonModule, 
    MatIcon
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private router = inject(Router);
  private sharedService = inject(SharedService);
  private loadingService = inject(LoadingService);
  private toastService = inject(ToastService);

  public categories: WritableSignal<ICategories[]> = signal([]);
  public selected: WritableSignal<string> = signal('Bolos');
  public itemFood: WritableSignal<IItems[]> = signal([]);
  
  public produtos: WritableSignal<IProduto[]> = signal([]);

  ngOnInit() {
    this.categories.set([
      { nome: 'Bolos', outlined: false, icon: 'cake' },
      { nome: 'Salgados', outlined: true, icon: 'bakery_dining' },
      { nome: 'Tortas', outlined: true, icon: 'cookie' },
      { nome: 'Bebidas', outlined: true, icon: 'water_loss' }
    ])

    const itemBase = {
      nome: 'Bolo de Chocolate',
      valor: 40,
      image: 'assets/menu/bolo_chocolate_3.jpeg',
      subtitle: 'Serve 8 à 10 pessoas.',
      ingrediente: 'trigo, chocolate em pó, fermento, leite condensado, margarina, ovos, leite integral',
      quantidade: 1
    }
    const lista = Array.from({ length: 8 }, () => ({ ...itemBase }));
    this.itemFood.set(lista)

    this.getListProdutos()
  }

  toogle(event: string) {
    this.categories.update(categories =>
      categories.map(cat => ({
        ...cat,
        outlined: cat.nome !== event
      }))
    )

    if (event === 'Bolos') {
      const itemBase = {
        nome: 'Bolo de Chocolate',
        valor: 40,
        image: 'assets/menu/bolo_chocolate_3.jpeg'
      }
      const lista = Array.from({ length: 8 }, () => ({ ...itemBase }));
      this.itemFood.set(lista)

    } else if (event === 'Salgados') {
      const itemBase = {
        nome: 'Salgado de presunto',
        valor: 40,
        image: 'assets/menu/salgado_jacare.jpeg'
      }
      const lista = Array.from({ length: 8 }, () => ({ ...itemBase }));
      this.itemFood.set(lista);

    } else if (event === 'Tortas') {
      const itemBase = {
        nome: 'Torta de Chocolate',
        valor: 40,
        image: 'assets/menu/torta_chocolate.jpeg'
      }
      const lista = Array.from({ length: 8 }, () => ({ ...itemBase }))
      this.itemFood.set(lista)
    } else {
      const itemBase = {
        nome: '-------------',
        valor: 0,
      }
      const lista = Array.from({ length: 8 }, () => ({ ...itemBase }))
      this.itemFood.set(lista)
    }
    this.selected.set(event);
  }

  showDetail(item: IItems) {
    this.router.navigate(['/detail', item])
  }

  getListProdutos(){
    this.loadingService.show()
    this.sharedService.getProduto()
    .then((res) => {
      this.produtos.set(res)
    })
    .catch((err) => {
      this.toastService.showToastError('Erro ao buscar listagem de produtos.')
    })
    .finally(() => {
      this.loadingService.hide()
    })
  }
}
