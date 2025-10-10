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
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';

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
    MatIcon,
    CarouselComponent
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
  public selected: WritableSignal<string> = signal('Todos');
  public itemFood: WritableSignal<IItems[]> = signal([]);

  public produtos: WritableSignal<IProduto[]> = signal([]);
  public filteredProdutos: WritableSignal<IProduto[]> = signal([]);
  readonly isVisible: WritableSignal<boolean> = signal(true);
  protected images: WritableSignal<any[] | undefined> = signal(undefined);
 
  async ngOnInit() {
    this.categories.set([
      { nome: 'Todos', outlined: false, icon: 'list' },
      { nome: 'Bolos', outlined: true, icon: 'cake' },
      { nome: 'Salgados', outlined: true, icon: 'bakery_dining' },
      { nome: 'Tortas', outlined: true, icon: 'cookie' },
      { nome: 'Bebidas', outlined: true, icon: 'water_loss' }
    ])

    await this.getListProdutos()
    this.filteredProdutos.set(this.produtos());
     this.images.set(this.filteredProdutos().map(produto => produto.fotoProd).slice(0,9))
  }

  toogle(event: string) {
    this.categories.update(categories =>
      categories.map(cat => ({
        ...cat,
        outlined: cat.nome !== event
      }))
    );

    this.selected.set(event);

    if (event === 'Todos') {
      this.isVisible.set(true)

      this.filteredProdutos.set(this.produtos());
      this.images.set(this.filteredProdutos().map(produto => produto.fotoProd).slice(0,9))
      console.log('images filtered', this.images())
    } else {
      this.isVisible.set(false);

      this.filteredProdutos.set(this.produtos().filter(produto => produto.categoriaNome === event));
    }
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

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    const term = target.value.toLowerCase().trim();

    if (!term) {
      this.filteredProdutos.set(this.produtos());
      return;
    }

    const filtrados = this.produtos().filter(p =>
      p.nomeProduto.toLowerCase().includes(term)
    );

    this.filteredProdutos.set(filtrados);
  }

}
