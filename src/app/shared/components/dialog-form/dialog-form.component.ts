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
import { InputNumberModule } from 'primeng/inputnumber';
import { CartService, ICartItem, IItemFinalizado } from '../../services/cart.service';

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
    ReactiveFormsModule,
    InputNumberModule
  ],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private cartService = inject(CartService);

  public visible: InputSignal<boolean> = input.required();
  public visibleChange: OutputEmitterRef<boolean> = output();
  public type: WritableSignal<string> = signal('user');
  public typePayment: WritableSignal<any[]> = signal([]);
  public total: WritableSignal<number> = signal(0);
  public formUser: FormGroup;
  public cart: InputSignal<ICartItem[] | undefined> = input();
  public metodo_pgto: WritableSignal<string> = signal('');

  constructor() {
    this.formUser = this.formBuilder.group({
      nome: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      rua: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      metodo_pgto: [null, [Validators.required]],
      troco: [null]
    })
  }

  ngOnInit() {
    this.typePayment.set([
      { name: 'Dinheiro' },
      { name: 'Pix' },
      { name: 'Crédito' },
      { name: 'Débito' }
    ])

    this.changeValue()
    this.total.set(this.cartService.getTotal())
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

      const pedidoFinal: IItemFinalizado  = {
        pedido: this.cart()!,
        usuario: {...this.formUser.value},
        total: this.total()
      }
      this.router.navigate(['/final'])
      this.cartService.setPedido(pedidoFinal)
      console.log('Dados usuário salvo', pedidoFinal)
    }
  }

  changeValue() {
    this.formUser.valueChanges.subscribe(value => {
      this.metodo_pgto.set(value.metodo_pgto);
    })
  }

}
