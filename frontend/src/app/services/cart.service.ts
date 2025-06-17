import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { Jersey } from '../shared/models/jersey';
import { CartItem } from '../shared/models/cartItem';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  selectedSize: string = '';
  customizationText: string = '';
  customizationNumber: string = '';
  fullCustomization: string = '';
  private cart: Cart = this.getCartToLocalStorage()
  private cartSubject: BehaviorSubject<Cart> = new  BehaviorSubject(this.cart);
  constructor() { }

  addToCart(jersey: Jersey): void {
    let cartItem = this.cart.items.find(item => item.jersey._id == jersey._id 
      && item.size == this.selectedSize 
      && (item.customization || '') == (this.fullCustomization || ''));

    if(cartItem){
      return;
    }
    this.cart.items.push(new CartItem(jersey, this.selectedSize, this.fullCustomization));
    this.setCartToLocalStorage();
  }

  removeFromCart(jerseyId: string, size:string, customization?:string): void {
    this.cart.items = this.cart.items.filter(item => !(item.jersey._id == jerseyId && item.size == size 
      && item.customization == customization));
    this.setCartToLocalStorage();
  }

  changeQuantity(jerseyId: string, quantity: number, size:string, customization?: string) {
    let cartItem = this.cart.items.find(item => item.jersey._id == jerseyId && item.size == size
      && (item.customization || '') == (customization || ''));

    if(!cartItem){
      return;
    }   
    cartItem.quantity= quantity;
    cartItem.price = quantity * cartItem.jersey.price;
    this.setCartToLocalStorage();
  }

  addCustomization(text: string, number: string) {
    this.customizationText = text;
    this.customizationNumber = number;
    this.fullCustomization = this.customizationText + " " + this.customizationNumber;
    this.setCartToLocalStorage();
  }

  addSize(size: string) {
    this.selectedSize = size;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  checkSize(): boolean {
    if(!this.selectedSize){
      alert('Selects size before adding to cart');
      return false;
    }
    return true;
  }

  checkCustomization():boolean {
    if(isNaN(Number(this.customizationNumber))){
      alert('Enter a valid number');
      return false;
    }
    if((this.customizationText && !isNaN(Number(this.customizationText)))){
      alert('Enter a valid name');
      return false;
    }
    return true;
  }

  /**
   * Prevents someone from directly editing the 'cartSubject' from the outside,
   * limits access only to the listing part.
   * 
   * @returns   the'cartSubject' object as Observable
   */
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  /**
   * Updates the local memory with the contents of the cart.
   */
  private setCartToLocalStorage(): void {
    //Calcolates the total price of the items in the cart
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    //Calcolates the total quantity of items in the cart
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    //Convert the 'Cart' object in a JSON string
    const cartJson = JSON.stringify(this.cart);
    //Saves the string in the browser's local memory
    localStorage.setItem('Cart', cartJson);
    //Send new data, updated shopping cart
    this.cartSubject.next(this.cart);
  }

  /**
   * Retrieves the cart from local memory and executes the parsing.
   * 
   * @returns     the cart object if it exists, otherwise create a new empty cart.
   */
  private getCartToLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }

}
