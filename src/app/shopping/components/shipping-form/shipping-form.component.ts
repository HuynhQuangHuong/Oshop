import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart:ShoppingCart;
  shipping: any = {};
  userSubscription: Subscription;
  userId : string;

  constructor(
    private router : Router,
    private authService : AuthService,
    private orderService : OrderService,) { }


  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  async placeOrder(){
    console.log(this.userId);
    
    let order = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.placeOrder(order); 
  
    this.router.navigate(['home/order-success', result.key])
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }














   
}
