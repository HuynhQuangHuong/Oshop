import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { SharedModule } from 'shared/shared.module';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';


@NgModule({
  imports: [
    SharedModule,
    ShoppingRoutingModule
  ],
  declarations: [
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    MyOrdersComponent
  ],
})
export class ShoppingModule { }
