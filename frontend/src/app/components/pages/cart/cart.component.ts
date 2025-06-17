import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../shared/models/cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/cartItem';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart!: Cart;

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  removeFromCart(cartItem:CartItem) {
    this.cartService.removeFromCart(cartItem.jersey._id, cartItem.size, cartItem?.customization);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.jersey._id, quantity, cartItem.size, cartItem?.customization);

  }
}
