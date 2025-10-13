import { Component, effect, inject, input, InputSignal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [
    CommonModule,
    CarouselModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  private router = inject(Router);
  public images: InputSignal<{image: string, id: number}[] | undefined> = input();

  constructor() {
    effect(() => {
      this.images()
    })
  }

  protected showDetailProduct(idProduct: number) {
    this.router.navigate(['detail', idProduct])
  }
  
}
