import { Component, OnInit } from '@angular/core';
import { ProductService } from './productService';
import { Productdisplay } from './Productdisplay';
import { Product } from "../models/product.model";
import { ShoppingCart } from "../models/shopping-cart.model";
import { ProductsDataService } from "../products.service";
import { ShoppingCartService } from "../shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { map, filter } from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-display-component',
  templateUrl: './product-display-component.component.html',
  styleUrls: ['./product-display-component.component.css']
})
export class ProductDisplayComponentComponent implements OnInit {
  public products: Product[]
  filterproducts: Product[];
  
  public constructor(private productsService: ProductsDataService,
                     private shoppingCartService: ShoppingCartService,
                     private route: ActivatedRoute) {
  }

  public addProductToCart(product: Product): void {

    this.shoppingCartService.addItem(product, 1);
  }

  public removeProductFromCart(product: Product): void {
    this.shoppingCartService.addItem(product, -1);
  }

  public getProductsByRoute(){
 
     let category = this.route.snapshot.paramMap.get('category');
     let subcategory = this.route.snapshot.paramMap.get('subcategory');
    if(category==null){
        this.filterproducts = this.products;
    }else{
      this.filterproducts =this.getProductsByCategory(category,subcategory);
    }
      
  }

  public getProductsByCategory(category,subcategory){
   
    if(subcategory!=null){
      return this.products.filter(p => p.category == category
        && p.sub_category== subcategory);
    }
    else{
      return this.products.filter(p => p.category ==category);
    }

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

  ngOnInit(): void {

    this.productsService. all().subscribe((response)=>{
      this.products = response;
      this.getProductsByRoute();
    });

  }


}


  
