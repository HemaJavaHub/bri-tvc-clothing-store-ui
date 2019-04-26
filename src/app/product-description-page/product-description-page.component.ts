import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../ecommerce/models/product.model';
import { Productdisplay } from '../product-display-component/Productdisplay';

@Component({
  selector: 'app-product-description-page',
  templateUrl: './product-description-page.component.html',
  styleUrls: ['./product-description-page.component.css']
})
export class ProductDescriptionPageComponent implements OnInit {

  id: any;
 name:any;
 size:any;
 price:any;
 
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    
    this.id = this.route.snapshot.paramMap.get("id");
    this.name= this.route.snapshot.paramMap.get("name");
    this.size=this.route.snapshot.paramMap.get("size");
    this.price=this.route.snapshot.paramMap.get("price");


   
    console.log( this.getProductsById(this.id));
  }


  getProductsById(id) {

    let list = Productdisplay;

    for (let i in list) {
       console.log(i); // "0", "1", "2",
    }
  
  }
}
