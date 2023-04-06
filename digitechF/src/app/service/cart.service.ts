import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any = [];
  //Behaviorsubject- it can emit or pass the subject
  public productList = new BehaviorSubject<any>([]);
  public search= new BehaviorSubject<string>("");
  constructor() { }

  //fetches the products list
  getProducts(){
    return this.productList.asObservable();
  }


  //push the products to cart
  setProducts(product:any){
   this.cartItemList.push(...product);
   this.productList.next(product);
  }


  addtoCart(product:any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }
  getTotalPrice():number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal +=a.price;
    })
    return grandTotal;
  }

  removeCartItem(product:any){
    this.cartItemList.map((a:any,index:any)=>{
      if(product.id === a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAll(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.cartItemList.next(this.cartItemList);
  }

}
