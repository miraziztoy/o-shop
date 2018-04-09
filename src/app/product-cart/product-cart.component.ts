import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/produc';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {
  @Input('product') product: Product;
  @Input('show-actions') ShowActions = true;
  
  constructor(private cartService: ShoppingCartService) { }
  
  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }

}
