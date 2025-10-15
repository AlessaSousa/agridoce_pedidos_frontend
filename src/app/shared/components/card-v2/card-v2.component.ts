import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { IProduto } from '../../models/IProduto';

@Component({
  selector: 'app-card-v2',
  imports: [
    CommonModule
  ],
  templateUrl: './card-v2.component.html',
  styleUrl: './card-v2.component.scss'
})
export class CardV2Component {
  product: InputSignal<IProduto | undefined> = input();
}
