import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './ApiService';
import { CustomerService } from './CustomerService';
import { AuthenticationService } from './AuthenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'javainuse'
  password = ''
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)
    ) {
      this.router.navigate([''])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }

}



 
//   tryLogin() {
//     this.api.login(
//       this.email,
//       this.password
//     )
//       .subscribe(
//         r => {
//           // if (r.token) {
//             this.customer.setToken(r.token);
//             this.router.navigateByUrl('/dashboard');
//           }
//         },
//         r => {
//           alert(r.error.error);
//         });
//   }



// }

