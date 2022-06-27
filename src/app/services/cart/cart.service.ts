import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: any = [];
  constructor() {}

  addToCart(product: any) {
    let i = 1;

    let data = {
      jewerly: product,
      quantity: i,
      unitPrice: product.price,
      amount: Number(product.price) * i,
    };
    console.log('data');
    console.log(data);

    let tmp1 = this.getItems();
    let item = tmp1.find((item: any) => item.jewerly.id === product.id);

    if (item === undefined) {
      this.items.push(data);
    } else {
      tmp1.forEach((element: any) => {
        if (element.jewerly.id == product.id) {
          element.quantity += 1;
          element.amount = Number(element.unitPrice) * element.quantity;
        }
      });
    }
  }

  removeItems(pos: any) {
    this.items.splice(pos, 1);
    return this.items;
  }

  itemCount() {
    return this.items.length;
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
