import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
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
  public item: InputSignal<any | undefined> = input();
}
