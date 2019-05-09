import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "../models/cart-item.model";
import { DeliveryOption } from "../models/delivery-option.model";
import { Product } from "../models/product.model";
import { ShoppingCart } from "../models/shopping-cart.model";
import { DeliveryOptionsDataService } from "../delivery-options.service";
import { ProductsDataService } from "../products.service";
import { ShoppingCartService } from "../shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Orderdetails, OrderItems } from '../models/orderdetails';
import { timeout } from 'rxjs/operators';

interface ICartItemWithProduct extends CartItem {
product: Product;
totalCost: number;
}

@Component({
selector: "app-checkout",
styleUrls: ["./checkout.component.scss"],
templateUrl: "./checkout.component.html"
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;
  public date:Date;
  public finalAmount:number;
  public orderDetails:Orderdetails;
  public orderItems:Array<OrderItems> = [];
  private products: Product[];
  private cartSubscription: Subscription;
  private orderNumber:any;
  private email:string;

  public constructor(private productsService: ProductsDataService, private http: HttpClient,
    private deliveryOptionService: DeliveryOptionsDataService,private shoppingCartService: ShoppingCartService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  public ngOnInit(): void {
  
    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
      this.products = products;

      this.cartItems = cart.items.map((item) => {
        const product = this.products.find((p) => p.id === item.productId);
        this.orderItems.push({name:item.name,size:item.size,qty:item.quantity,price:product.price * item.quantity})
        return {
        ...item,
        product,
        totalCost: product.price * item.quantity };
        });
        console.log(this.orderItems);

        this.cart.subscribe((shoppingCart)=>{this.finalAmount = shoppingCart.grossTotal});
        this.finalAmount= +(this.finalAmount.toFixed(2));
  
        //this.address=localStorage.getItem('address');
        console.log(localStorage.getItem("username"));
        this.orderDetails = new Orderdetails();
            this.orderDetails.username=localStorage.getItem("username");
            this.orderDetails.email=localStorage.getItem("email");
            this.orderDetails.items=this.orderItems;
            this.orderDetails.total=this.finalAmount;
            this.orderDetails.address=localStorage.getItem("address");
            let header = {headers:new HttpHeaders({
              'Content':'application/json'
            })}
             
            let url='http://10.211.117.143:9999/order-service/order/processorder';
            this.http.post<string>(url, this.orderDetails,{ responseType: 'text' as 'json'}).pipe(timeout(6000)).subscribe( 
              (response)=>{
              this.orderNumber= response;
               console.log(response);
               localStorage.setItem('orderNumber',JSON.stringify(response));
               this.email = localStorage.getItem('email');
               return response;
            });

      });
     
  });

}

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
} 