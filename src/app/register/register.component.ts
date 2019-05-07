import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { UserserviceService } from '../services/userservice.service';
import { AlertserviceService } from '../services/alertservice.service';
import { Observable } from 'rxjs';


const httpoptions=
{ headers : new HttpHeaders({'Content-Type': 'application/json'})}
;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  responseStatus:Number;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserserviceService,
      private alertService: AlertserviceService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      console.log("inside onsubmit")
      ////this.loading = true;
      this.userService.register(this.registerForm.value).subscribe((response)=>{
        if(response==="success"){
         // this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        }else{
          this.alertService.error(response.statusText);
          this.loading = false;
        }
      });
         //Convert response to JSON
      
    }
      // .subscribe(
      //         data => {
                
      //             this.alertService.success('Registration successful', true);
      //             this.router.navigate(['/login']);
      //         },
      //         error => {
      //             this.alertService.error(error);
      //             this.loading = false;
      //         });
  //}
}





//   registerForm: FormGroup;
//   firstName:string;
//   lastName:string;
//   email:string;
//   password:string;
//   user:User;
//   constructor( private formBuilder: FormBuilder,private http:HttpClient,private _http: Http, private router: Router)
    
//     { }

//   ngOnInit() {
//     this.registerForm = this.formBuilder.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', Validators.required],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//   });
//   }

//   get f() { return this.registerForm.controls; }
//   onSubmit(){
//  let result :any;
 
//    this.user=this.registerForm.value;
//  result = this.http.post('http://localhost:8091/users/registration', this.user)
//             .subscribe(
//                 data => {
//                     console.log("data"+data);
//                     alert('Registration successful');
//                     this.router.navigate(['/home']);
//                 },
//                 error => {
//                 });
      
        
//                 return result;

                
    
             
//   }


  

//}
