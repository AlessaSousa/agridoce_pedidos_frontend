import { Component, WritableSignal, signal } from '@angular/core';
import { MenuBarComponent } from '../../shared/components/menu-bar/menu-bar.component';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
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
  public categories: WritableSignal<any[]> = signal([]);
  public selected: WritableSignal<string> = signal('Bolos');
  public itemFood: WritableSignal<any[]> = signal([]);

  ngOnInit() {
    this.categories.set([
      { nome: 'Bolos', outlined: false },
      { nome: 'Salgados', outlined: true },
      { nome: 'Tortas', outlined: true },
      { nome: 'Bebidas', outlined: true }
    ])
    this.itemFood.set([
      {
        nome: 'Bolo de Morango',
        valor: 40
      },
      {
        nome: 'Bolo de Morango',
        valor: 40
      },
      {
        nome: 'Bolo de Morango',
        valor: 40
      },
      {
        nome: 'Bolo de Morango',
        valor: 40
      },
      {
        nome: 'Bolo de Morango',
        valor: 40
      },
      {
        nome: 'Bolo de Morango',
        valor: 40
      }, {
        nome: 'Bolo de Morango',
        valor: 40
      }, {
        nome: 'Bolo de Morango',
        valor: 40
      }, {
        nome: 'Bolo de Morango',
        valor: 40
      }
    ])
  }

  toogle(event: string) {
    this.categories.update(categories =>
      categories.map(cat => ({
        ...cat,
        outlined: cat.nome !== event
      }))
    )

    if (event === 'Bolos') {
      const lista = [
        {
          nome: 'Bolo de Morango',
          valor: 40
        },
        {
          nome: 'Bolo de Morango',
          valor: 40
        },
        {
          nome: 'Bolo de Morango',
          valor: 40
        },
        {
          nome: 'Bolo de Morango',
          valor: 40
        },
        {
          nome: 'Bolo de Morango',
          valor: 40
        },
        {
          nome: 'Bolo de Morango',
          valor: 40
        }, {
          nome: 'Bolo de Morango',
          valor: 40
        }, {
          nome: 'Bolo de Morango',
          valor: 40
        }, {
          nome: 'Bolo de Morango',
          valor: 40
        }
      ]
      this.itemFood.set(lista)
    }
    this.selected.set(event);
  }
}
