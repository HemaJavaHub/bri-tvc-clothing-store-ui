import { Component, OnInit } from '@angular/core';
import { Product } from "../models/product.model";
import { ProductsDataService } from "../products.service";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models';
@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
  public products: Product[];
  currentUser:User;
  username:string;
  constructor(private productdataService:ProductsDataService , private router:Router, private authenticationService:AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  getMensPants(){
    this.router.navigateByUrl('/productdisplay', {skipLocationChange: true})
               .then(()=>this.router.navigate(["/productdisplay/Men/Pants"]));

  }

  getMensShirts(){
    this.router.navigateByUrl('/productdisplay', {skipLocationChange: true})
    .then(()=>this.router.navigate(["/productdisplay/Men/Shirts"]));
  }

  getWomensDress(){
    this.router.navigateByUrl('/productdisplay', {skipLocationChange: true})
               .then(()=>this.router.navigate(["/productdisplay/Women/Dress"]));
  }
  getWomensTops(){
    this.router.navigateByUrl('/productdisplay', {skipLocationChange: true})
               .then(()=>this.router.navigate(["/productdisplay/Women/Tops"]));
  }



  getBoysShirts(){
    this.router.navigateByUrl('/productdisplay', {skipLocationChange: true})
               .then(()=>this.router.navigate(["/productdisplay/Boys/Shirts"]));
  }
  getBoysPants(){
    this.router.navigateByUrl('/productdisplay', {skipLocationChange: true})
               .then(()=>this.router.navigate(["/productdisplay/Boys/Pants"]));
  }


  getGirlsDress(){
    this.router.navigateByUrl('/productdisplay', {skipLocationChange: true})
               .then(()=>this.router.navigate(["/productdisplay/Girls/Dress"]));
  }
  getGirlsTops(){
    this.router.navigateByUrl('/productdisplay', {skipLocationChange: true})
               .then(()=>this.router.navigate(["/productdisplay/Girls/Tops"]));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);

}

  ngOnInit() {
   
    }
  }

