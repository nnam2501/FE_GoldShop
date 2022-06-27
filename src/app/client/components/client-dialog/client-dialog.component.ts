import { Component, OnInit } from '@angular/core';
import {
  NbComponentStatus,
  NbDialogRef,
  NbGlobalLogicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderDetailService } from 'src/app/services/order-detail/order-detail.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss'],
})
export class ClientDialogComponent implements OnInit {
  content: string = '';
  data: any;
  items: any;
  constructor(
    protected dialogRef: NbDialogRef<ClientDialogComponent>,
    private toastrService: NbToastrService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close();
    this.onAdd(this.data, this.items);
    this.showToast('success', `Đặt hàng thành công`);
  }

  onAdd(data: any, items: any) {
    this.orderService.addOrder(data).subscribe((res: any) => {
      console.log(res);
      let orderId = res.id;
      // console.log(items);

      items.forEach((element: any) => {
        let data1 = {
          order: orderId,
          jewerly: element.jewerly.id,
          quantity: element.quantity,
          unitPrice: element.unitPrice,
          amount: element.amount,
        };

        this.orderDetailService.addOrderDetail(data1).subscribe((res1: any) => {
          console.log(res1);
        });
      });
    });
  }

  showToast(status: NbComponentStatus, mess: string) {
    this.toastrService.show(status, `${mess}`, {
      status,
      limit: 3,
      position: NbGlobalLogicalPosition.BOTTOM_END,
    });
  }
}
