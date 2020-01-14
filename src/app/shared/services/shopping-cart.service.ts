import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { take, map } from 'rxjs/operators'
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.list<ShoppingCart>('/shopping-carts/' + cartId + '/items').valueChanges()
      .pipe(map((x: any) => {
        // console.log(x);
        return new ShoppingCart(x)
      }));
  }

  async addToCart(product: Product) {
    console.log(product)
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    console.log(product);
    
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      if (item) {
        let quantity = (item.quantity || 0) + change;
        if (quantity === 0) item$.remove();
        else
          item$.update({
            key: product.key,
            title: product.title,
            imgageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity,
            category: product.category,
          })
      } else {
        item$.set({
          key: product.key,
          title: product.title,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl,
          quantity: 1
        })
      }
    });
  };
}
