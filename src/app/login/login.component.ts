import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './ApiService';
import { CustomerService } from './CustomerService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeaderComponentComponent } from '../header-component/header-component.component';
import { headersToString } from 'selenium-webdriver/http';
import { Http, Response,Headers } from '@angular/http';

const httpoptions=
{ headers : new HttpHeaders({'Content-Type': 'application/json'})}
;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

email:string;
password:string;
username:string;
  constructor(private http:HttpClient,private _http: Http, private router: Router)
    
    { }

  ngOnInit() {
  }


  userLogin(){
   
    let postData = new FormData();
   let result;
   let url = 'http://localhost:8091/users/login';
    //priya changes
    let headers = new Headers();
    headers.append('email',this.email);
    headers.append('password',this.password);
     result =  this._http.get(url,{headers:headers}).subscribe(data => {
       //console.log(data);
  });
  if (!(result==="login failed")) {
    sessionStorage.setItem(
      'username',result);
      // 'token',
      // btoa(this.email+ ':' + this.password)
    // );
    this.router.navigate(['/home']);
} else {
    alert("Authentication failed.");
}
      console.log(result);
return result;





  }

    
  // alert(result);
  //   }).map(res => res.json()).subscribe(isValid => {
  //       if (isValid) {
  //           sessionStorage.setItem(
  //             'token',
  //             btoa(this.model.email+ ':' + this.model.password)
  //           );
  //           this.router.navigate(['/home']);
  //       } else {
  //           alert("Authentication failed.");
  //       }
  //   });
  // }

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

