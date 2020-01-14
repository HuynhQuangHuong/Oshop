import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

  }

  ngOnInit() {
    // console.log(this.route.snapshot.paramMap.get('id'));

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.id != 'new') {
      this.productService.get(this.id).subscribe(p => {
        this.product = p
      });
    }
    this.categoryService.getCategories().valueChanges().subscribe(list => {
      this.categories$ = list;
    })

  }

  save(product) {
    
    if (product.price > 0) {
      if (this.id && this.id != 'new') this.productService.update(this.id, product);
      else this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products'])
  }
}
