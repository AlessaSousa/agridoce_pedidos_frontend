import { Component, signal, WritableSignal } from '@angular/core';
import { ItemComponent } from '../../shared/components/item/item.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogFormComponent } from '../../shared/components/dialog-form/dialog-form.component';
@Component({
  selector: 'app-cart',
  imports: [
    ItemComponent,
    ButtonModule,
    DialogFormComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  public visible: WritableSignal<boolean> = signal(false);

  showModal() {
    this.visible.set(true);
  }

  closeDialog() {
    this.visible.set(false);
  }
}
