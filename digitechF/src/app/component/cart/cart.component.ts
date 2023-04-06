import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  public product:any = [];
  public grandTotal!:number ;
  constructor(private cartService:CartService,private router:Router) { }


  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.product=res;


      this.grandTotal=this.cartService.getTotalPrice();
    })
  }

  // @Output() dataEmitter = new EventEmitter<any>();

  onCheckOut() {
    // this.dataEmitter.emit(this.product);
    // this.router.navigate(['checkout']);
  }

  removeItem(item:any){


    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAll();
  }


}

