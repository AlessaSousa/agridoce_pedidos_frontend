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
import { SharedService } from '../../services/shared.service';
import { ToastService } from '../../services/toast.service';

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
  private sharedService = inject(SharedService);
  private toastService = inject(ToastService);

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
    })
  }

  ngOnInit() {
    this.typePayment.set([
      { name: 'Dinheiro', value: 'DINHEIRO' },
      { name: 'Pix', value: 'PIX' },
      { name: 'Crédito', value: 'CREDITO' },
      { name: 'Débito', value: 'DEBITO' }
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
    
    const lista = this.cart()?.map(i => ({
      produtoId: i.produto.id,
      quantidade: i.quantidade
    }));

    const date = new Date;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    const formulario = {
      dataPedido: formattedDate,
      statusPedido: 'PENDENTE',
      valorTotal: this.total(),
      usuario: {
        nome: this.formUser.value.nome,
        telefone: this.formUser.value.telefone,
      },
      endereco: {
        bairro: this.formUser.value.bairro,
        cep: this.formUser.value.cep,
        rua: this.formUser.value.rua,
        numero: this.formUser.value.numero
      },
      pagamento: {
        metodo_pag: this.formUser.value.metodo_pgto,
        valor_pag: this.total()
      },
      pedido: lista || []
    }


    this.type.set(type);
    if (type === 'finalizar') {
      this.closeDialog()

      // const pedidoFinal: IItemFinalizado = {
      //   pedido: this.cart()!,
      //   usuario: { ...this.formUser.value },
      //   total: this.total()
      // }
      this.router.navigate(['/final'])
      this.cartService.setPedido(formulario)
      console.log('Dados usuário salvo', formulario)
      this.sharedService.createPedido(formulario)
      .then((res) => {
        this.toastService.showToastSuccess('Pedido realizado.')
      })
      .catch((err) => {
        console.log('erro ao criar pedido', err)
        this.toastService.showToastError('Erro ao criar pedido.')
      })
    }
  }

  changeValue() {
    this.formUser.valueChanges.subscribe(value => {
      this.metodo_pgto.set(value.metodo_pgto);
    })
  }

}
