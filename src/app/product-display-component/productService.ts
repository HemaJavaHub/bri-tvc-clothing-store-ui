import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ProductService {
  private _url= 'assets/products.json';
  constructor(private _http: HttpClient) {}
  getProducts() {
    return this._http.get(this._url);
  }

 
}
