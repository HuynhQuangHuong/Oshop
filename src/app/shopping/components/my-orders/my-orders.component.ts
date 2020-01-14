import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: Observable<any>;
  constructor(
    private authService : AuthService,
    private afAuth: AngularFireAuth,
    private orderService : OrderService) { 

      this.orders$ = authService.user$.pipe(switchMap(u => {
        if (u) {
          return orderService.getOrdersByUser(u.uid).valueChanges();
        }
      }))
  }

}
