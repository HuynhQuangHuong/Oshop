import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminProductsComponent as Product } from './products/products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { FormsModule, NgModel } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    Product,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
