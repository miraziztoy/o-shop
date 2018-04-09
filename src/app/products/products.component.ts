import { Component, OnInit } from '@angular/core';
import { Product } from '../models/produc';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredPods: Product[] =[];
  
  category: string;

  constructor(
              private productService: ProductService,
              
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
      })
   }
}
