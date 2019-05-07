import { HomeComponentComponent } from './home-component/home-component.component';
import { ProductDisplayComponentComponent } from './product-display-component/product-display-component.component';
import { ProductDescriptionPageComponent } from './product-description-page/product-description-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShippingBillingComponent } from './shipping-billing/shipping-billing.component';
import { PaypalComponent } from './paypal/paypal.component';


const routes: Routes = [

  {
    path :'home',
    component :HomeComponentComponent
  },
  {
    path :'',
    component :HomeComponentComponent
  },
  {
    path: 'productdisplay',
    component: ProductDisplayComponentComponent
  },
  {
    path: 'productdisplay/:category/:subcategory',
    component: ProductDisplayComponentComponent
  },
  {
    path: 'productdisplay/:category',
    component: ProductDisplayComponentComponent
  },
  
  {
    path: 'productDescription/:id/:name/:price/:size',
    // path: 'productDescription',
      component: ProductDescriptionPageComponent
    
    },
  {
    path: 'checkout',
       // path: 'productDescription',
  
      component: CheckoutComponent
        
    },

  {  
    path: 'login',
      
    component: LoginComponent
    },

  { 
    path: 'register',

    component: RegisterComponent
  

  },
  { 
    path: 'shippingbilling',

    component: ShippingBillingComponent
  

  },
  { 
    path: 'paypal',

    component: PaypalComponent
  

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
