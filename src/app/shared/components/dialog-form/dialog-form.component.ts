import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-dialog-form',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    FloatLabel,
    InputMaskModule,
    SelectModule
  ],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {
  public visible: InputSignal<boolean> = input.required();
  public visibleChange: OutputEmitterRef<boolean> = output();
  public type: WritableSignal<string> = signal('user');
  public typePayment: WritableSignal<string[]> = signal(['Dinheiro, Cartão de Crédito, Cartão de Débito, Pix'])
  selectedPayment = '';
  value1 = '';
  value2 = '';
  get _visible(): boolean {
    return this.visible();
  }

  set _visible(value: boolean) {
    this.visibleChange.emit(value);
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  advance(type: string) {
    this.type.set(type);
  }

}
