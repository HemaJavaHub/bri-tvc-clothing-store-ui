
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit,AfterViewChecked } from "@angular/core";
import { CartItem } from "../models/cart-item.model";
import { DeliveryOption } from "../models/delivery-option.model";
import { Product } from "../models/product.model";
import { ShoppingCart } from "../models/shopping-cart.model";
import { DeliveryOptionsDataService } from "../delivery-options.service";
import { ProductsDataService } from "../products.service";
import { ShoppingCartService } from "../shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
 
declare let paypal: any;
interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
  }

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit, AfterViewChecked {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;
  public date:Date;

  private products: Product[];
  private cartSubscription: Subscription;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  orderNumber:any;
  address:string;
  
  finalAmount: number;
 
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox:'AbYHgPbYy89xhYXJyyne8U-sD32bR6vafyS3GXm2RBbiKjv4NTWOZ1Zcr4YACZ1nOFhm8dJg3ljst-hz',
      //production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        
          this.orderNumber = "abc123";
          localStorage.setItem('orderNumber',this.orderNumber);
          let url='http://localhost:8091/users/registration';
          this.orderNumber= this.http.post(url, this.address).subscribe((response)=>{
          return response;
          });
          this.router.navigate(['/checkout']);
          //Do something when payment is successful.

        
      })
    }
  };
 
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }


 

  public constructor(private productsService: ProductsDataService,private router: Router,private http: HttpClient,
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
          return {
            ...item,
            product,
            totalCost: product.price * item.quantity };
          });
        });
    });

    this.cart.subscribe((shoppingCart)=>{this.finalAmount = shoppingCart.grossTotal});
    this.address=localStorage.getItem('address');

}

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }





}
