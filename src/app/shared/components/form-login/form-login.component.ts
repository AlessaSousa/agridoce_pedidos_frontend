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

@Component({
  selector: 'app-form-login',
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private loadingService = inject(LoadingService);
  readonly formLogin: FormGroup;
  constructor() {
    this.formLogin = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }

  signin(){
    if (this.formLogin.invalid) return;
    this.loadingService.show()
    this.authService.login(this.formLogin.value).subscribe({
      next: () => {
        this.toastService.showToastSuccess('Login realizado')
      },
      error: (err) => {
        this.toastService.showToastError('Erro no login')
      }
    })
  }
}
