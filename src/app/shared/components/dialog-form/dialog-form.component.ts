import { CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { Router } from '@angular/router';

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
    SelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  public visible: InputSignal<boolean> = input.required();
  public visibleChange: OutputEmitterRef<boolean> = output();
  public type: WritableSignal<string> = signal('user');
  public typePayment: WritableSignal<any[]> = signal([]);
  public total: WritableSignal<number> = signal(110);
  public formUser: FormGroup;
  public cart: InputSignal<any | undefined> = input();

  constructor() {
    this.formUser = this.formBuilder.group({
      nome_user: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      rua: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      metodo_pgto: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    this.typePayment.set([
      { name: 'Dinheiro' },
      { name: 'Pix' },
      { name: 'Crédito' },
      { name: 'Débito' }
    ])
  }

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
    if (type === 'finalizar') {
      this.closeDialog()

      const pedidoFinal = {
        ...this.cart(),
        ...this.formUser.value
      }
      this.router.navigate(['/final', pedidoFinal])
      console.log('Dados usuário salvo', pedidoFinal)
    }

  }

}
