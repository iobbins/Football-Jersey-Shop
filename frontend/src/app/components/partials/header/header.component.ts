import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;

  constructor(cartService: CartService, private userService: UserService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    //When the user changes, update this.user
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser
    })
  }

  logout() {
    this.userService.logout();
  }

  /**
   * Returns the value of the token property of the user object.
   * Used to verify authentication.
   */
  get isAuth() {
    return this.user.token;
  }
}
