import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router ) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })


  }
  login(){
    console.log(this.loginForm.value);
    this.http.post<any>("http://localhost:5000/api/user/login", this.loginForm.value)
    .subscribe(res=>{
      // const user = res.find((a:any)=>{
      //   return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      // });
    if(res?.token){
      alert("Login Success");
      this.loginForm.reset();
      this.router.navigate(['products']);
    }else{
      alert(res.message);
    }
    },err=>{
      alert("Something went wrong!");
    })
  }


}

