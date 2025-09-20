import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStructure } from './orderWhatsapp';
@Component({
  selector: 'app-completed',
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent {
  private router = inject(Router);
  private orderStructure = inject(OrderStructure);
  private activateRoute = inject(ActivatedRoute);
  public finalOrder: WritableSignal<any | undefined> = signal(undefined);

  constructor() {
    this.activateRoute.params.subscribe(params => {
      this.finalOrder.set({
        nome: params['nome'],
        valor: params['valor'],
        subtitle: params['subtitle'],
        ingrediente: params['ingrediente'],
        image: params['image'],
        quantidade: params['quantidade'],
        nome_user: params['nome_user'],
        telefone: params['telefone'],
        rua: params['rua'],
        numero: params['numero'],
        bairro: params['bairro'],
        cep: params['cep'],
        metodo_pgto: params['metodo_pgto']
      });

    })
  }

  goToMenu() {
    this.router.navigate(['/menu'])
  }

  gerarLink() {
    this.orderStructure.gerarLinkWhatsApp()
  }
}
