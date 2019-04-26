import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDisplayComponentComponent } from './product-display-component/product-display-component.component';
import { AppComponent } from './app.component';

import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './ecommerce/login/login.component';
import { ProductDescriptionPageComponent } from './product-description-page/product-description-page.component';

const routes: Routes = [

    {
      path :'home',
      component :HomeComponentComponent

    },


{
  path: 'productdisplay',
   component: ProductDisplayComponentComponent
  
  },
  {
    path: 'login',
     component: LoginComponent
    
    },
    {
      path: 'productDescription/:id/:name/:price/:size',
     // path: 'productDescription',

       component: ProductDescriptionPageComponent
      
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
