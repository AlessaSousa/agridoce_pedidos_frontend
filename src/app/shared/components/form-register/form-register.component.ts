import { CommonModule } from '@angular/common';
import { Component, inject, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-form-register',
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule,
    PasswordModule
  ],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.scss'
})
export class FormRegisterComponent {
  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);
  readonly formRegister: FormGroup;
  public backToLogin: OutputEmitterRef<string> = output()
  constructor() {
    this.formRegister = this.formBuilder.group({
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmSenha: ['', Validators.required]
    })
  }

  signin() {
    if (this.formRegister.invalid) return;
    
    const { senha, confirmSenha } = this.formRegister.value;
    if (senha !== confirmSenha) {
      return this.toastService.showToastError('As senhas não coincidem');
    }
    
    this.loadingService.show()
    this.authService.register(this.formRegister.value)
      .then((res) => {
        this.toastService.showToastSuccess('Cadastro realizado.')
        this.backToLogin.emit('login')
      })
      .catch((err) => {
        this.toastService.showToastError('Erro no cadastro.')
      })
      .finally(() => {
        this.loadingService.hide()
      })
  }
}
