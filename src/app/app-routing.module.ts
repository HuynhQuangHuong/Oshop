import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { LoginComponent } from './core/components/login/login.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';

import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { SignupComponent } from './core/components/signup/signup.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "admin",
    component: ShoppingComponent,
    children: [
      {
        path: "",
        loadChildren: "./admin/admin.module#AdminModule"
      }
    ]
  },
  {
    path: "home",
    component: ShoppingComponent,
    children: [
      {
        path: "",
        loadChildren: "./shopping/shopping.module#ShoppingModule"
      }
    ]
  },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
