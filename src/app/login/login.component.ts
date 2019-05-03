import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { AlertserviceService } from '../services/alertservice.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isLoggedIn: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertserviceService
) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
}

 
ngOnInit() {
  this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }


onSubmit() {
  this.submitted = true;
  console.log("beginning onSubmit");
  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
              this.isLoggedIn=true;
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}

//   userLogin(){
   
//     let postData = new FormData();
//    let result;
//    let url = 'http://localhost:8091/users/login';
//     //priya changes
//     let headers = new Headers();
//     headers.append('email',this.email);
//     headers.append('password',this.password);
//      result =  this._http.get(url,{headers:headers}).subscribe(data => {
//        //console.log(data);
//   });
//   if (!(result==="login failed")) {
//     sessionStorage.setItem(
//       'username',result);
//       // 'token',
//       // btoa(this.email+ ':' + this.password)
//     // );
//     this.router.navigate(['/home']);
// } else {
//     alert("Authentication failed.");
// }
//       console.log(result);
//return result;
  //}


}



 


