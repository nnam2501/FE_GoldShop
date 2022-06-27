import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderDetailService } from 'src/app/services/order-detail/order-detail.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users-pages',
  templateUrl: './users-pages.component.html',
  styleUrls: ['./users-pages.component.scss'],
})
export class UsersPagesComponent implements OnInit {
  model: any;

  infoCustomer: any;
  info: any;
  dtOrder: any = [];

  dtDetail: any = [];

  constructor(
    private route: Router,
    private userService: UserService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
    this.userService
      .getCurrentUser(localStorage.getItem('access_token'))
      .subscribe((res: any) => {
        this.customerService.getAllCustomer().subscribe((res1: any) => {
          this.infoCustomer = res1.filter((item: any) => {
            if (item.account === res.id) {
              return item;
            }
          });
          this.info = this.infoCustomer[0];
          // console.log(this.infoCustomer);
        });
        this.orderService.getAllOrder().subscribe((res2: any) => {
          // var idOrder;
          res2.forEach((item1: any) => {
            // console.log(item1);
            // console.log(this.info);

            if (item1.customer === this.info.id) {
              this.dtOrder.push(item1);
            }
          });
          console.log('order');

          console.log(this.dtOrder);
          this.orderDetailService.getAllOrderDetail().subscribe((res2: any) => {
            this.dtDetail = res2;
            console.log('orderDetail');
            console.log(this.dtDetail);
          });
        });
      });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_staff');
    this.route.navigate(['/']);
  }
}
