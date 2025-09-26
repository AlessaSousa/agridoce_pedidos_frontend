import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SharedService } from '../../shared/services/shared.service';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ToastService } from '../../shared/services/toast.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private sharedService = inject(SharedService);
  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  public email = signal('');

  constructor() {
    this.email.set(this.authService.emailUser())
  }

  logout() {
    this.loadingService.show()
    this.authService.logout()
      .then((res) => {
        this.router.navigate(['/login']);
      })
      .catch(() => {
        this.toastService.showToastError('Erro ao sair da conta.')
      })
      .finally(() => {
        this.loadingService.hide()
      })
  }
}
