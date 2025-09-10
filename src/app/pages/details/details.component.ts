import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Button, ButtonModule } from "primeng/button";
import { Router } from '@angular/router';

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
  
  ngOnInit() {
    this.detail.set(
      {
        title: 'Bolo de Chocolate Vulcão',
        subtitle: 'Serve 8 à 10 pessoas.',
        ingrediente: 'trigo, chocolate em pó, fermento, leite condensado, margarina, ovos, leite integral',
        valor: 100,
        quantidade: 2,
        image: 'assets/menu/bolo_chocolate_3.jpeg'
      }
    )
  }

  goToMenu() {
    this.router.navigate(['/menu'])
  }
  goToCart() {
    this.router.navigate(['/cart'])
  }
}
