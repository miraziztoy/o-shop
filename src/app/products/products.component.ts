import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/produc';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredPods: Product[] =[];
  subscription: Subscription;
  category: string;
  cart: any;

  constructor(
              private productService: ProductService,
              private shoppingCart: ShoppingCartService,
              private route: ActivatedRoute) {
   

    productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;  
    })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredPods = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
  }
   async ngOnInit() {
   this.subscription = (await this.shoppingCart.getCart())
     .subscribe(cart => this.cart = cart);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
