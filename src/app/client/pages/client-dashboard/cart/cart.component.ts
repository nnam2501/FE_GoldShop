import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  orderDate = new Date();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log(this.orderDate.toLocaleString());

    console.log(this.items);
  }
}
