import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
// import { DataTableResource } from 'angular-4-data-table'; 

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  items: Product[] = [];
  itemCount: number;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(list => {
      console.log(list);
      this.filteredProducts = this.products = list;
      this.dtTrigger.next();
    });
  }

  filter(query: string) {
    console.log(query);

    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5 
    };
  }

}
