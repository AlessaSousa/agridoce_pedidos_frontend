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
    // this.produtos.set([
    //   {
    //     id: 1,
    //     nomeProduto: 'Bolo de Chocolate',
    //     descricaoProduto: 'Delicioso bolo de chocolate cremoso',
    //     precoProd: 20,
    //     disponibilidadeProduto: IDisponibilidadeProduto.Disponivel,
    //     categoria: {
    //       nomeCategoria: 'Bolos',
    //       descricao: 'Bolo'
    //     } as ICategoria,
    //     restaurante: {} as any,
    //     image: 'assets/menu/bolo_chocolate.jpg', 
    //     quantidade: 5
    //   },
    //   {
    //     id: 2,
    //     nomeProduto: 'Torta de Limão',
    //     descricaoProduto: 'Massa crocante com recheio de limão',
    //     precoProd: 15,
    //     disponibilidadeProduto: IDisponibilidadeProduto.Disponivel,
    //     categoria: {
    //       nomeCategoria: 'Tortas',
    //       descricao: 'Tortas'
    //     } as ICategoria,
    //     restaurante: {} as any,
    //     image: 'assets/menu/bolo_chocolate.jpg', 
    //     quantidade: 5
    //   },
    //   {
    //     id: 3,
    //     nomeProduto: 'Coxinha de Frango',
    //     descricaoProduto: 'Coxinha tradicional com recheio cremoso',
    //     precoProd: 8,
    //     disponibilidadeProduto: IDisponibilidadeProduto.Esgotado,
    //     categoria: {
    //       nomeCategoria: 'Salgados',
    //       descricao: 'Salgado'
    //     } as ICategoria,
    //     restaurante: {} as any,
    //     image: 'assets/menu/bolo_chocolate.jpg', 
    //     quantidade: 5
    //   },
    //   {
    //     id: 4,
    //     nomeProduto: 'Pastel de Carne',
    //     descricaoProduto: 'Pastel frito recheado com carne moída',
    //     precoProd: 7,
    //     disponibilidadeProduto: IDisponibilidadeProduto.Disponivel,
    //     categoria: {
    //       nomeCategoria: 'Tortas',
    //       descricao: 'Tortas'
    //     } as ICategoria,
    //     restaurante: {} as any,
    //     image: 'assets/menu/bolo_chocolate.jpg', 
    //     quantidade: 5
    //   },
    //   {
    //     id: 5,
    //     nomeProduto: 'Bolo Red Velvet',
    //     descricaoProduto: 'Bolo macio com cobertura de cream cheese',
    //     precoProd: 30,
    //     disponibilidadeProduto: IDisponibilidadeProduto.Indisponivel,
    //     categoria: {
    //       nomeCategoria: 'Bolos',
    //       descricao: 'Bolos'
    //     } as ICategoria,
    //     restaurante: {} as any,
    //     image: 'assets/menu/bolo_chocolate.jpg', 
    //     quantidade: 5
    //   },
    //   {
    //     id: 6,
    //     nomeProduto: 'Torta de Morango',
    //     descricaoProduto: 'Recheada com creme e coberta com morangos frescos',
    //     precoProd: 25,
    //     disponibilidadeProduto: IDisponibilidadeProduto.Disponivel,
    //     categoria: {
    //       nomeCategoria: 'tortas',
    //       descricao: 'Tortas'
    //     } as ICategoria,
    //     restaurante: {} as any,
    //     image: 'assets/menu/bolo_chocolate.jpg', 
    //     quantidade: 5
    //   },
    //   {
    //     id: 7,
    //     nomeProduto: 'Refrigerante Lata',
    //     descricaoProduto: 'Bebida gelada para acompanhar seu pedido',
    //     precoProd: 6,
    //     disponibilidadeProduto: IDisponibilidadeProduto.Disponivel,
    //     categoria: {
    //       nomeCategoria: 'Bebidas',
    //       descricao: 'Bebidas'
    //     } as ICategoria,
    //     restaurante: {} as any,
    //     image: 'assets/menu/bolo_chocolate.jpg', 
    //     quantidade: 5
    //   },
    //   {
    //     id: 8,
    //     nomeProduto: 'Suco Natural de Laranja',
    //     descricaoProduto: 'Suco fresco espremido na hora',
    //     precoProd: 10,
    //     disponibilidadeProduto: IDisponibilidadeProduto.Esgotado,
    //     categoria: {
    //       nomeCategoria: 'Bebidas',
    //       descricao: 'Bebidas'
    //     } as ICategoria,
    //     restaurante: {} as any,
    //     image: 'assets/menu/bolo_chocolate.jpg', 
    //     quantidade: 5
    //   }
    // ])

    this.produtos.set(PRODUTOS)
    this.filteredProdutos.set(
      this.produtos().filter(produto => produto.categoria.nomeCategoria === "Bolos" )
    );
  }

  // toogle(event: string) {
  //   this.categories.update(categories =>
  //     categories.map(cat => ({
  //       ...cat,
  //       outlined: cat.nome !== event
  //     }))
  //   )

  //   if (event === 'Bolos') {
  //     const itemBase = {
  //       nome: 'Bolo de Chocolate',
  //       valor: 40,
  //       image: 'assets/menu/bolo_chocolate_3.jpeg'
  //     }
  //     const lista = Array.from({ length: 8 }, () => ({ ...itemBase }));
  //     this.itemFood.set(lista)

  //   } else if (event === 'Salgados') {
  //     const itemBase = {
  //       nome: 'Salgado de presunto',
  //       valor: 40,
  //       image: 'assets/menu/salgado_jacare.jpeg'
  //     }
  //     const lista = Array.from({ length: 8 }, () => ({ ...itemBase }));
  //     this.itemFood.set(lista);

  //   } else if (event === 'Tortas') {
  //     const itemBase = {
  //       nome: 'Torta de Chocolate',
  //       valor: 40,
  //       image: 'assets/menu/torta_chocolate.jpeg'
  //     }
  //     const lista = Array.from({ length: 8 }, () => ({ ...itemBase }))
  //     this.itemFood.set(lista)
  //   } else {
  //     const itemBase = {
  //       nome: '-------------',
  //       valor: 0,
  //     }
  //     const lista = Array.from({ length: 8 }, () => ({ ...itemBase }))
  //     this.itemFood.set(lista)
  //   }
  //   this.selected.set(event);
  // }

  toogle(event: string) {
    this.categories.update(categories =>
      categories.map(cat => ({
        ...cat,
        outlined: cat.nome !== event
      }))
    );

    this.selected.set(event);

    this.filteredProdutos.set(
      this.produtos().filter(produto => produto.categoria.nomeCategoria === event)
    );
  }

  showDetail(item: IProduto) {
    this.router.navigate(['/detail', item.id])
  }

  getListProdutos() {
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
