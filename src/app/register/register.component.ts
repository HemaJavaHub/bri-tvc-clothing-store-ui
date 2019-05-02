import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  user:User;
  constructor( private formBuilder: FormBuilder,private http:HttpClient,private _http: Http, private router: Router)
    
    { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.registerForm.controls; }
  onSubmit(){
 let result :any;
 
   this.user=this.registerForm.value;
 result = this.http.post('http://localhost:8091/users/registration', this.user)
            .subscribe(
                data => {
                    console.log("data"+data);
                    alert('Registration successful');
                    this.router.navigate(['/home']);
                },
                error => {
                });
      
        
                return result;

                
    
             
  }


  

}
