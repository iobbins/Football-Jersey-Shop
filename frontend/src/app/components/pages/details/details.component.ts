import { Component } from '@angular/core';
import { Jersey } from '../../../shared/models/jersey';
import { ActivatedRoute, Router} from '@angular/router';
import { JerseyService } from '../../../services/jersey.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  jersey!: Jersey ;

  constructor(activateRoute: ActivatedRoute, jerseyService:JerseyService, public cartService: CartService, private router: Router) {
    activateRoute.params.subscribe((params) => {
      if(params.id)
        this.jersey = jerseyService.getJerseyById(params.id);
    })
  }

  public addToCart() {
    if(!(this.cartService.checkSize() && this.cartService.checkCustomization())) 
      return;
    this.cartService.addToCart(this.jersey);
    this.router.navigateByUrl('/cart');
  }

  public addSize(size: string) {
    this.cartService.addSize(size);
  }

  public addCustomization(text: string, number: string) {
    this.cartService.addCustomization(text, number);
  }
  
}
