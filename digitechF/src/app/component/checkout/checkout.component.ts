import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  items = [{
    name : '',
    price: ''
  }];

  // @Input() receivedData: any;  

  clearCart() {
    this.items = [];
    // this.cartService.clearCart();
  }
}
