import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { OrderStructure } from './orderWhatsapp';
@Component({
  selector: 'app-completed',
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent {
  private router = inject(Router);
  private orderStructure = inject(OrderStructure);

  goToMenu() {
    this.router.navigate(['/menu'])
  }

  gerarLink() {
    this.orderStructure.gerarLinkWhatsApp()
  }
}
