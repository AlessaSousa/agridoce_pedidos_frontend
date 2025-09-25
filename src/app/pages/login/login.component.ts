import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormLoginComponent } from '../../shared/components/form-login/form-login.component';
import { FormRegisterComponent } from '../../shared/components/form-register/form-register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    FormLoginComponent,
    FormRegisterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  readonly type: WritableSignal<string> = signal('');
  readonly formLogin: FormGroup;

  constructor() {
    this.formLogin = this.formBuilder.group({
      user: [null],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      confirmSenha: [null]
    })
  }

  showForm(type: string) {
    this.type.set(type)
  }

  signin() { }

  backToLogin(event: string) {
    this.type.set(event)
  }

  goToMenu() {
    this.router.navigate(['/menu'])
  }
}
