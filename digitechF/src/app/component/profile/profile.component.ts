import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public profileForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router ) { }


  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      // email:['',Validators.required],
      oldpassword:['',[Validators.required, this.patternValidator]],
      newpassword:['',[Validators.required, this.patternValidator]],
      confirmnewPassword:['',[Validators.required, this.patternValidator]],

    })


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


  login(){
    console.log(this.profileForm.value);
    // this.http.post<any>("http://localhost:5000/api/user/login", this.loginForm.value)
    // .subscribe(res=>{
    //   // const user = res.find((a:any)=>{
    //   //   return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
    //   // });
    // if(res?.token){
    //   alert("Login Success");
    //   this.loginForm.reset();
    //   this.router.navigate(['products']);
    // }else{
    //   alert(res.message);
    // }
    // },err=>{
    //   alert("Something went wrong!");
    // })
  }
}
