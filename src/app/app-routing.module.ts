import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDisplayComponentComponent } from './product-display-component/product-display-component.component';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { ProductDescriptionPageComponent } from './product-description-page/product-description-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';

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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
