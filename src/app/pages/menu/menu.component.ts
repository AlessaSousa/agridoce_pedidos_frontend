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
import { IDisponibilidadeProduto, IProduto, PRODUTOS } from '../../shared/models/IProduto';
import { ICategoria } from '../../shared/models/ICategoria';

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
  public filteredProdutos: WritableSignal<IProduto[]> = signal([]);

  async ngOnInit() {
    this.categories.set([
      { nome: 'Bolos', outlined: false, icon: 'cake' },
      { nome: 'Salgados', outlined: true, icon: 'bakery_dining' },
      { nome: 'Tortas', outlined: true, icon: 'cookie' },
      { nome: 'Bebidas', outlined: true, icon: 'water_loss' }
    ])

    const itemBase = {
      nome: 'Bolo de Chocolate',
      valor: 40,
      fotoProd: 'assets/menu/bolo_chocolate_3.jpeg',
      subtitle: 'Serve 8 à 10 pessoas.',
      ingrediente: 'trigo, chocolate em pó, fermento, leite condensado, margarina, ovos, leite integral',
      quantidade: 1
    }
    const lista = Array.from({ length: 8 }, () => ({ ...itemBase }));
    this.itemFood.set(lista)

    await this.getListProdutos()
    // this.getListCategorias()

    // this.produtos.set(PRODUTOS)
    this.filteredProdutos.set(
      this.produtos().filter(produto => produto?.categoriaNome === "Bolos")
    );
  }

  toogle(event: string) {
    this.categories.update(categories =>
      categories.map(cat => ({
        ...cat,
        outlined: cat.nome !== event
      }))
    );

    this.selected.set(event);

    this.filteredProdutos.set(
      this.produtos().filter(produto => produto.categoriaNome === event)
    );
  }

  showDetail(item: IProduto) {
    this.router.navigate(['/detail', item.id])
  }

  async getListProdutos() {
    this.loadingService.show()
    await this.sharedService.getProduto()
      .then((res) => {
        this.produtos.set(res)
        console.log('resposta', res)
      })
      .catch((err) => {
        this.toastService.showToastError('Erro ao buscar listagem de produtos.')
      })
      .finally(() => {
        this.loadingService.hide()
      })
  }

  getListCategorias() {
    this.loadingService.show()
    this.sharedService.getCategoria()
      .then((res) => {
        this.categories.set([
          { nome: res[0].nomeCategoria, outlined: false, icon: 'cake' },
          { nome: res[1].nomeCategoria, outlined: true, icon: 'bakery_dining' },
          { nome: res[2].nomeCategoria, outlined: true, icon: 'cookie' },
          { nome: res[3].nomeCategoria, outlined: true, icon: 'water_loss' }
        ])

        console.log('resposta categorias', res)
      })
      .catch((err) => {
        this.toastService.showToastError('Erro ao buscar categorias.')
      })
      .finally(() => {
        this.loadingService.hide()
      })
  }
}
