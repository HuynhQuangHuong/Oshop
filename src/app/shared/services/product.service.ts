import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product).then(p => {
      this.db.object(`/products/${p.key}`).update({
        product,
        key: p.key
      })
    }); 
  }

  getAll(): Observable<Product[]>{
    return this.db.list<Product>('/products').valueChanges();
  }

  get(productId){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update({...product});
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
  
}
