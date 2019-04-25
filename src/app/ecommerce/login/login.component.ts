import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './ApiService';
import { CustomerService } from './CustomerService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = 'peter@klaven';
  password = 'cityslicka';
 
  constructor(private api: ApiService, private customer: CustomerService, private router: Router) {
  }

    


  ngOnInit() {
  }




 
  tryLogin() {
    this.api.login(
      this.email,
      this.password
    )
      .subscribe(
        r => {
          if (r.token) {
            this.customer.setToken(r.token);
            this.router.navigateByUrl('/dashboard');
          }
        },
        r => {
          alert(r.error.error);
        });
  }



}

