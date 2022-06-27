import { Component, OnInit } from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalLogicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { DialogComponent } from 'src/app/admin/components/dialog/dialog.component';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  dataCustomer: any;

  settings = {
    columns: {
      fullName: { title: 'Tên khách hàng' },
      dateOfBirth: { title: 'Ngày sinh' },
      gender: {
        title: 'Giới tính',
        valuePrepareFunction: (gender: any) => {
          if (gender) {
            return 'Nam';
          }
          return 'Nữ';
        },
        filter: false,
      },
      address: { title: 'Địa chỉ' },
      phoneNumber: { title: 'Số điện thoại' },
      idNumber: { title: 'CCCD/CMND' },
      // account: {
      //   title: 'Mã tài khoản',
      //   // valuePrepareFunction: (account: any) => {
      //   //   return account.id;
      //   // },
      //   editable: false,
      // },
    },

    // edit: {
    //   editButtonContent: '<i class="far fa-edit"></i>',
    //   saveButtonContent: '<i class="fas fa-check"></i>',
    //   cancelButtonContent: '<i class="fas fa-times"></i>',
    //   confirmSave: true,
    // },
    // delete: {
    //   deleteButtonContent: '<i class="fas fa-trash-alt"></i>',
    //   confirmDelete: true,
    // },
    pager: {
      display: true,
      perPage: 5,
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
    attr: {
      class: 'table table-bordered',
    },
  };
  mess?: string;
  method?: string;
  subjects?: string;

  constructor(
    private customerService: CustomerService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.customerService.getAllCustomer().subscribe((res) => {
      this.dataCustomer = res;
    });
  }

  onEdit = (event: any) => {
    // console.log(event.data.id);

    this.mess =
      'Bạn có chắc chắn muốn thay đổi thông tin khách hàng này không?';
    this.method = 'put';
    this.subjects = 'khách hàng';
    return this.showDialog(
      this.mess,
      event.newData,
      this.method,
      this.subjects,
      event.confirm
    );
  };

  onDelete = (event: any) => {
    console.log(event.data.id);
    this.mess = 'Bạn có chắc chắn muốn xóa khách hàng này không?';
    this.method = 'delete';
    this.subjects = 'khách hàng';
    return this.showDialog(
      this.mess,
      event.data.id,
      this.method,
      this.subjects,
      event.confirm
    );
  };

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
