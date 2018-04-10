import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
   
    
    constructor(public items: ShoppingCartItem[]) {}

       get getTotal(){
            let count =0;
            for (let productdId in this.items) 
                count +=this.items[productdId].quantity;
            return count;
    }
}