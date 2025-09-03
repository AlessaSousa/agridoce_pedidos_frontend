import { Component, WritableSignal, signal } from '@angular/core';
import { MenuBarComponent } from '../../shared/components/menu-bar/menu-bar.component';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';

interface ICategories {
  nome: string;
  outlined: boolean;
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
    MenuBarComponent,
    ButtonModule,
    CardComponent,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public categories: WritableSignal<ICategories[]> = signal([]);
  public selected: WritableSignal<string> = signal('Bolos');
  public itemFood: WritableSignal<IItems[]> = signal([]);

  ngOnInit() {
    this.categories.set([
      { nome: 'Bolos', outlined: false },
      { nome: 'Salgados', outlined: true },
      { nome: 'Tortas', outlined: true },
      { nome: 'Bebidas', outlined: true }
    ])

    const itemBase = {
      nome: 'Bolo de Morango',
      valor: 40,
      image: 'assets/menu/bolo_chocolate_3.jpeg'
    }
    const lista = Array.from({ length: 8 }, () => ({ ...itemBase }));
    this.itemFood.set(lista)
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
        nome: 'Bolo de Morango',
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
}
