import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent {
  private router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/menu']);
    }, 3000);
  }
}
