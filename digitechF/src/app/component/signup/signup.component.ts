import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  public signupForm !:FormGroup;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router) { }
  
  errMessage = '';

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname:['', [Validators.required,this.nameValidator]],
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required,this.patternValidator]],
      confirmPassword:['', [Validators.required,this.patternValidator]],
      mobile:['', [Validators.required,Validators.pattern('[0-9 ]{10}')]]
    })
}
  onSignUp(){
    console.log(this.signupForm.value);
    let reqPayload = {
      name: this.signupForm.value.fullname,
      email: this.signupForm.value.email,
      mobile:this.signupForm.value.mobile,
      password: this.signupForm.value.password,
    }
    
    this.http.post<any>("http://localhost:5000/api/user/register",reqPayload)
    .subscribe(res=>{
      if (res?.message) {
        // alert("User Already Exists!");
        this.errMessage = "User Already Exists!";
      } else {
          alert("Signup Successfull");
          this.signupForm.reset();
          this.router.navigate(['login']);
        }
    },err=>{
      alert("Something went wrong");

    })


  }


  nameValidator(control: FormControl): any {
    let namePattern1: RegExp = /^[a-zA-Z]+(?:[\\s-][a-zA-Z0-9]+)*$/;
    // let namePattern1: RegExp = /^[a-zA-Z ]+/;
    // let namePattern2: RegExp = /^[^ ].*/;
    // let namePattern3: RegExp = /.*[^ ]$/;
    let value = control.value;
    // let matches: boolean = namePattern1.test(value) && namePattern2.test(value) && namePattern3.test(value);
    let matches: boolean = namePattern1.test(value);


    if (!matches) {
        return { nameInvalid:{message:"Name contains invalid character!"}}
    }
    return null;
  }


  patternValidator(control: FormControl): any {
    let pattern1: RegExp = /^.*[A-Z]+.*/;
    let pattern2: RegExp = /^.*[a-z]+.*/;
    let pattern3: RegExp = /.*[\d]+.*/;
    let pattern4: RegExp = /.*[@#$%&*^]+.*/;
    let value = control.value;
    let matches: boolean = pattern1.test(value) && pattern2.test(value) && pattern3.test(value)
        && pattern4.test(value);


    if (!matches) {
        return { passwordInvalid:{message:"Password must have atleast an uppercase letter, a lowercase letter, a symbol and a number !"}}
    }
    return null;
  }


  MatchPassword(passwordControl: AbstractControl): any {
    return (confirmPasswordControl: AbstractControl)=>{
        if(passwordControl.value != confirmPasswordControl.value)
            return false;
        return true;
    };
}


}

