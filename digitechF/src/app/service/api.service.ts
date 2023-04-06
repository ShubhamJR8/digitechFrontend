import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getProduct(){
    return this.http.get<any>("http://localhost:5000/api/product/")
    .pipe(map((res:any)=>{ return res}))
  }

  // updateProduct() {
    // return this.http.put<any>("http://localhost:5000/api/product/",c)
    // .pipe(map((res:any)=>{ return res}))
  // }

}
