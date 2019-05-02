import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Product } from "./models/product.model";


import { CachcingServiceBase } from "./caching.service";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';


let count = 0;

@Injectable()
export class ProductsDataService extends CachcingServiceBase {
  private products: Observable<Product[]>;
  public productst: Product[];
  public category: String;
  public subcategory: String;
  public constructor(private http: Http,private route: ActivatedRoute) {
    super();
    
  }

  public all(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
                                 (val: Observable<Product[]>) => this.products = val,
                                 () => this.http
                                           .get("./assets/products.json")
                                           .map((response) => response.json()
                                                                      .map((item) => {
                                                                        let model = new Product();
                                                                        model.updateFrom(item);
                                                                        return model;
                                                                      })));

  }



}
