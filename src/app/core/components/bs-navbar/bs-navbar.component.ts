import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  cart: ShoppingCart;
  public isMenuCollapsed = true;

  constructor(
    public auth: AuthService, 
    private shoppingCartService: ShoppingCartService,) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appuser =>
      this.appUser = appuser);
    // console.log(appuser)
    
     this.cart$ = await this.shoppingCartService.getCart();

    //   let count = this.shoppingCartService.getTotalItemCount(cart);
    //   cart.TotalItemCount
    // this.cart$ = await this.shoppingCartService.getCart();
    // this.cart$.subscribe(c => this.cart = c)
  }

  logout() {
    this.auth.logout();
    this.shoppingCartService.clearCart();
  }
}
