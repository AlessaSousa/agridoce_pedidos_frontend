import { Component } from '@angular/core';
import { MenuBarComponent } from '../../shared/components/menu-bar/menu-bar.component';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-menu',
  imports: [
    InputIcon, 
    IconField, 
    InputTextModule, 
    FormsModule,
    MenuBarComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}
