import { Component, OnInit } from '@angular/core';
import { ProductService } from './productService';
import { Productdisplay } from './Productdisplay';
import { Product } from "../models/product.model";
import { ShoppingCart } from "../models/shopping-cart.model";
import { ProductsDataService } from "../products.service";
import { ShoppingCartService } from "../shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Component({
  selector: 'app-product-display-component',
  templateUrl: './product-display-component.component.html',
  styleUrls: ['./product-display-component.component.css']
})
export class ProductDisplayComponentComponent implements OnInit {
  public products: Observable<Product[]>;
 
  
  
  public constructor(private productsService: ProductsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  public addProductToCart(product: Product): void {

    this.shoppingCartService.addItem(product, 1);
  }

  public removeProductFromCart(product: Product): void {
    this.shoppingCartService.addItem(product, -1);
  }

  public productInCart(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.productId === product.id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
  }

  public ngOnInit(): void {
    this.products = this.productsService.all();
  }
}


  
