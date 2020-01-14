import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
// import { DataTableModule } from 'angular-4-data-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnviromentComponent } from './enviroment/enviroment.component';
import { environment } from 'environments/environment.prod';
import { BsNavbarComponent } from './core/components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthService } from 'shared/services/auth.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { UserService } from 'shared/services/user.service';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';


import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ShoppingComponent } from './shopping/shopping.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    EnviromentComponent,
    ShoppingComponent,
    AdminComponent
  ],

  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    // RouterModule.forRoot([
    
    // ])
  ],
  providers: [
    AdminAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
