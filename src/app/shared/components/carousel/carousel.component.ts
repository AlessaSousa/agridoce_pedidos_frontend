import { Component, effect, input, InputSignal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';

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
  public images: InputSignal<any[] | undefined> = input();

  constructor() {
    effect(() => {
      this.images()
    })
  }
//   images = [
//   'assets/img1.jpg',
//   'assets/img2.jpg',
//   'assets/img3.jpg',
//   'assets/img4.jpg'
// ];

  
}
