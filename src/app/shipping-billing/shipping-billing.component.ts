import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { shippingandbilling } from '../models/shippingandbilling';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-billing',
  templateUrl: './shipping-billing.component.html',
  styleUrls: ['./shipping-billing.component.css']
})
export class ShippingBillingComponent implements OnInit {
  @Input('group')
  public shippingBillingForm: FormGroup;
  public state:string;
  loading = false;
  submitted = false;
  shippingandbilling:shippingandbilling;
  address:string;

states = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM',
          'FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA',
          'ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV',
          'NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW',
          'PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA',
          'WA','WV','WI','WY','AE','AA','AP'];

          constructor(
            private formBuilder: FormBuilder,
            private router: Router,
            // private authenticationService: AuthenticationService,
            // private userService: UserserviceService,
            // private alertService: AlertserviceService
        ){}

 

 ngOnInit() {
      this.shippingBillingForm = this.formBuilder.group({
          fullName: ['', Validators.required],
          email : ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required], 
          state:['', Validators.required],
          zip:['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.shippingBillingForm.controls; }

  onSubmit() {
    console.log("Im in ");
      this.submitted = true;
      
      // stop here if form is invalid
      if (this.shippingBillingForm.invalid) {
          return;
      }
      console.log("inside onsubmit")
      this.shippingandbilling=this.shippingBillingForm.value;
      this.address=this.shippingBillingForm.value.address+' '+this.shippingBillingForm.value.city+' '+this.shippingBillingForm.value.state+' '+this.shippingBillingForm.value.zip;
      localStorage.setItem('address',this.address);
      localStorage.setItem('email',this.shippingBillingForm.value.email);
      console.log(this.shippingBillingForm.value.fullName)
  
      //this.loading = true;

          this.router.navigate(['/paypal']);
        }
      //});
    //      Convert response to JSON
      
    // }
    //   // .subscribe(
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

