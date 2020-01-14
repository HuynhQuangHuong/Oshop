import { Component } from '@angular/core';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent  {
  product$;

  constructor(productService: ProductService) {
    this.product$ = productService.getAll();
   }


}
