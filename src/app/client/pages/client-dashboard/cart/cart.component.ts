import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderDetailService } from 'src/app/services/order-detail/order-detail.service';
import { UserService } from 'src/app/services/user/user.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalLogicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { ClientDialogComponent } from 'src/app/client/components/client-dialog/client-dialog.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items?: any;
  infoUser: any;
  orderDate = new Date();
  tmp: any;
  idAcc: any;
  total: any;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private userService: UserService,
    private customerService: CustomerService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();

    this.userService
      .getCurrentUser(localStorage.getItem('access_token'))
      .subscribe((res: any) => {
        this.idAcc = res.id;
      });

    this.customerService.getAllCustomer().subscribe((res1: any) => {
      this.tmp = res1;

      this.tmp.forEach((element: any) => {
        if (element.account === this.idAcc) {
          this.infoUser = element;
        }
      });
    });

    this.countTotal();
  }

  order() {
    if (localStorage.getItem('access_token') !== null) {
      if (localStorage.getItem('is_staff') === 'false') {
        var a: any;
        this.tmp.forEach((item: any) => {
          if (item.account === this.idAcc) {
            a = item;
          }
        });
        var data = {
          order_date: this.orderDate.toLocaleString(),
          customer: a.id,
        };
        if (this.items.length > 0) {
          this.showDialog(data, this.items);
          // return (this.total = 0);
          // return (this.items = this.cartService.clearCart());
        } else {
          this.showToast('danger', 'Giỏ hàng trống');
        }
      } else {
        this.showToast(
          'danger',
          'Không thể dùng tài khoản nhân viên để đặt hàng'
        );
      }
    } else {
      this.showToast('danger', 'Vui lòng đăng nhập để đặt hàng');
    }
  }

  del(id: any) {
    let a = this.cartService.removeItems(id);
    this.countTotal();
    // console.log(this.cartService.getItems());
  }

  countTotal() {
    this.total = 0;
    let tmp = this.cartService.getItems();
    tmp.forEach((item: any) => {
      this.total += item.amount;
    });
  }

  showDialog(data: any, items: any) {
    this.dialogService
      .open(ClientDialogComponent, {
        closeOnBackdropClick: false,
        context: {
          data: data,
          items: items,
        },
      })
      .onClose.subscribe((status) => {
        if (status) {
          this.total = 0;
          this.items = this.cartService.clearCart();
        }
      });
    // .close((this.items = this.cartService.clearCart()));
  }

  showToast(status: NbComponentStatus, mess: string) {
    this.toastrService.show(status, `${mess}`, {
      status,
      limit: 3,
      position: NbGlobalLogicalPosition.BOTTOM_END,
    });
  }
}
