import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/partials/header/header.component';
import { MenuSearchComponent } from './components/partials/menu-search/menu-search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MenuSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
