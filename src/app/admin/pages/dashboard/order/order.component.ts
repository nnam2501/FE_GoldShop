import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalLogicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { DialogComponent } from 'src/app/admin/components/dialog/dialog.component';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { InvoicesService } from 'src/app/services/invoives/invoices.service';
import { OrderDetailService } from 'src/app/services/order-detail/order-detail.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  dataOrder: any;
  dataCustomer?: any;
  infoEmployee: any;
  dtOrderDetail: any = [];
  total: number = 0;

  settings = {
    columns: {
      id: { title: 'Mã đơn hàng', editable: false },
      orderDate: { title: 'Ngày đặt', editable: false },
      customer: {
        title: 'Người đặt',
        valuePrepareFunction: (customer: any) => {
          for (let i of this.dataCustomer) {
            if (i.id === customer) {
              return i.fullName;
            }
          }
        },
        editable: false,
        filter: false,
      },
      active: {
        title: 'Trang thai',
        valuePrepareFunction: (customer: any) => {
          return customer ? 'Đang chờ xử lý' : 'Đã giao hàng';
        },
        filter: false,
      },
    },
    pager: {
      display: true,
      perPage: 5,
    },
    actions: {
      position: 'right',
      add: false,
      delete: false,
      edit: false,
      custom: [
        {
          name: 'detail',
          title: '<i class="far fa-edit"></i>',
        },
        {
          name: 'invoice',
          title: '<i class="far fa-edit"></i>',
        },
      ],
    },
    attr: {
      class: 'table table-bordered',
    },
  };
  mess?: string;
  method?: string;
  subjects?: string;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private invoiceServices: InvoicesService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private orderDetailService: OrderDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrder().subscribe((res: any) => {
      this.dataOrder = res;
    });
    this.customerService.getAllCustomer().subscribe((res: any) => {
      this.dataCustomer = res;
    });

    this.userService
      .getCurrentUser(localStorage.getItem('access_token'))
      .subscribe((res: any) => {
        console.log(res);
        this.employeeService.getAllEmployee().subscribe((res1: any) => {
          this.infoEmployee = res1.filter((item: any) => {
            if (item.account.id === res.id) {
              return item;
            }
          });
          console.log('employee');

          console.log(this.infoEmployee);
        });
      });
  }

  onCustom(event: any) {
    console.log(event);
    if (event.action === 'detail') {
      this.onDetail(event.data);
    }
    if (event.action === 'invoice') {
      this.createInvoice(event);
    }
  }

  onDetail(data: any) {
    this.router.navigate([`/dashboard/order/order-detail/${data.id}`]);
  }

  createInvoice(event: any) {
    this.orderDetailService.getAllOrderDetail().subscribe((res: any) => {
      res.forEach((item: any) => {
        if (item.order === Number(event.data.id)) {
          this.dtOrderDetail.push(item);
          this.total += item.amount;
        }
      });
    });

    setTimeout(() => {
      let dtTmp = {
        order: event.data.id,
        employee: this.infoEmployee[0].id,
        total: this.total,
      };

      this.mess = 'Bạn có muốn tạo hóa đơn cho đơn hàng này không?';
      this.method = 'post';
      this.subjects = 'hóa đơn';
      return this.showDialog(
        this.mess,
        dtTmp,
        this.method,
        this.subjects,
        event.confirm
      );
    }, 100);
  }

  showToast(status: NbComponentStatus, mess: string) {
    this.toastrService.show(status, `${mess}`, {
      status,
      limit: 3,
      position: NbGlobalLogicalPosition.BOTTOM_END,
    });
  }

  showDialog(
    content: any,
    data: any,
    method: string,
    subjects: string,
    confirms: any
  ) {
    this.dialogService.open(DialogComponent, {
      closeOnBackdropClick: false,
      context: {
        content: content,
        data: data,
        method: method,
        subjects: subjects,
        confirm: confirms,
      },
    });
  }
}
