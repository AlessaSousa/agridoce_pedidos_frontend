import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly visibleLogin: WritableSignal<boolean> = signal(false);
  readonly visibleRegister: WritableSignal<boolean> = signal(false);
 
  showForm(type: string) {
    if(type === 'login') {
      this.visibleLogin.set(true);
    } else  {
      this.visibleLogin.set(false);
    }
    if(type === 'register') {
      this.visibleRegister.set(true);
    } else {
      this.visibleRegister.set(false);
    }
  }
}
