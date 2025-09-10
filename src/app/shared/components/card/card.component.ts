import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public card: InputSignal<any | undefined> = input();

  addItem() {
  }
}
