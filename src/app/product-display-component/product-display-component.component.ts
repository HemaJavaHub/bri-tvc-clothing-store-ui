import { Component, OnInit } from '@angular/core';
import { ProductService } from './productService';
import { Productdisplay } from './Productdisplay';

@Component({
  selector: 'app-product-display-component',
  templateUrl: './product-display-component.component.html',
  styleUrls: ['./product-display-component.component.css']
})
export class ProductDisplayComponentComponent implements OnInit {

  products: Productdisplay[] = [];
  constructor(private _productService: ProductService){}
  ngOnInit() {
   

    
        this._productService.getProducts ().subscribe(
                (products: any[]) => {
                    this.products = products;
                    console.log(products);
                },
                (error) => console.log(error)
            );
    }


  }
