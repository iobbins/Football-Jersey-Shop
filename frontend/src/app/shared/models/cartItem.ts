import { Jersey } from "./jersey";

export class CartItem {

    jersey: Jersey;
    quantity: number = 1;
    price: number;
    size: string;
    customization?: string;
    
    constructor(jersey: Jersey, size: string, customization: string){ 
        this.jersey = jersey;
        this.price = this.jersey.price;
        this.size = size;
        this.customization = customization;
    }
    
}