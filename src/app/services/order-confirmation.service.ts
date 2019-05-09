import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orderdetails } from '../models/orderdetails';

@Injectable({
  providedIn: 'root'
})
export class OrderConfirmationService {
 orderNumber:string;
  constructor(private http: HttpClient) { }

  processorder(orderDetails: Orderdetails) : any{
    let url='http://10.211.117.143:9999/order-service/order/processorder';
    this.http.post<string>(url, orderDetails,{ responseType: 'text' as 'json'}).subscribe(
      (response)=>{
      this.orderNumber= response;
       console.log(response);
       localStorage.setItem('orderNumber',JSON.stringify(response));
      // this.email = localStorage.getItem('email');
       return response;
    });


    // let url='http://localhost:9999/order-service/order/processorder';
    // return this.http.post(url, orderDetails).subscribe((response)=>{
    //   return response;
    // });
  }
}
