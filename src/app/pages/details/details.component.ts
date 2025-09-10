import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Button, ButtonModule } from "primeng/button";
import { ActivatedRoute, Router } from '@angular/router';

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
  public detail: WritableSignal<any | null> = signal(null);
  private activateRoute = inject(ActivatedRoute);

  constructor() {
    this.activateRoute.params.subscribe(params => {
      this.detail.set({
        nome: params['nome'],
        valor: params['valor'],
        subtitle: params['subtitle'],
        ingrediente: params['ingrediente'],
        image: params['image'],
        quantidade: params['quantidade']
      });
    })
  }

  goToMenu() {
    this.router.navigate(['/menu'])
  }

  goToCart(detail: any) {
    const cart = detail
    this.router.navigate(['/cart', cart])
  }
}
