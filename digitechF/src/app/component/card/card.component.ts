import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { variable } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


  public cardForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router) { }


  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      cardName:['',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z]+")]],
      cardNumber:[['',Validators.required,Validators.pattern("^[1-9][0-9]{15}$")]],
      cardDate:['']
    })


  }


  card(){
    this.http.post<any>("http://localhost:3000/card",this.cardForm.value)
    .subscribe(res=>{
      alert("Card Added Successfull");
      this.cardForm.reset();
      this.router.navigate(['product']);
    },err=>{
      alert("Something went wrong");
    })
}
}


