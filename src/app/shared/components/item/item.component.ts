import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-item',
  imports: [
    CommonModule,
    InputNumber,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  public item: WritableSignal<any | null> = signal(null);

  ngOnInit() {
    this.item.set({
      title: 'Bolo de chocolate vulcão',
      valor: 100,
      quantidade: 2,
      image: 'assets/menu/bolo_chocolate_3.jpeg'
    })
  }
}
