import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { SharedService } from '../../services/shared.service';
import { LoadingService } from '../../services/loading.service';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule,
    PasswordModule
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  readonly formLogin: FormGroup;
  constructor() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    })
  }

  async signin() {
    // if (this.formLogin.invalid) return;
    this.loadingService.show()
    await this.authService.login(this.formLogin.value)
      .then((res) => {
        this.toastService.showToastSuccess('Login realizado')
        this.router.navigate(['/menu'])
      })
      .catch((err) => {
        console.log('erro login', err)
        this.toastService.showToastError('Erro no login')
      })
      .finally(() => {
        this.loadingService.hide()
      })
  }
}
