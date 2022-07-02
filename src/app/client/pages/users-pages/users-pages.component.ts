import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { JewerlyService } from 'src/app/services/jewerly/jewerly.service';
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
  dtJewerly: any = [];
  constructor(
    private route: Router,
    private userService: UserService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private jewerlyService: JewerlyService
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
        });
        this.orderService.getAllOrder().subscribe((res2: any) => {
          res2.forEach((item1: any) => {
            if (item1.customer === this.info.id) {
              this.dtOrder.push(item1);
            }
          });

          this.orderDetailService.getAllOrderDetail().subscribe((res2: any) => {
            this.dtDetail = res2;
          });
        });
        this.jewerlyService.getJewerly().subscribe((res) => {
          this.dtJewerly = res;
        });
      });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_staff');
    this.route.navigate(['/']);
  }

  getNameJewerly(id: any) {
    this.dtJewerly.forEach((item: any) => {
      if (item.id === id) {
        return item.jewerlyName;
      }
    });
  }
}
