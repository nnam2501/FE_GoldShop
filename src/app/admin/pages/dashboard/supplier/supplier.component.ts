import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NbGlobalLogicalPosition,
  NbToastrService,
  NbComponentStatus,
  NbDialogService,
} from '@nebular/theme';

import { SupplierService } from '../../../../services/supplier/supplier.service';
import { Supplier } from '../../interface';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  providers: [SupplierService],
})
export class SupplierComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  data: any;
  dtSupp: Supplier[] = [];
  mess: string = '';
  status: any;
  method: string = '';
  subjects: string = '';

  regex: RegExp = /^[+ 0-9]{8,10}$/;

  src: any;

  settings = {
    columns: {
      supplierName: { title: 'Tên Nhà Cung Cấp' },
      phoneNumber: { title: 'Số Điện Thoại' },
      address: { title: 'Địa Chỉ' },
      email: { title: 'Email' },
    },
    add: {
      addButtonContent: '<i class="fas fa-plus"></i>',
      createButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="far fa-edit"></i>',
      saveButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-trash-alt"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 5,
    },
    actions: {
      position: 'right',
    },
    attr: {
      class: 'table table-bordered',
    },
  };

  constructor(
    private api: SupplierService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  async ngOnInit(): Promise<any> {
    this.api
      .getSupp()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.data = res;
        this.dtSupp = this.data;
      });
  }

  onAdd = (event: any) => {
    //check none supplier
    if (event.newData.supplierName === '') {
      // this.mess = await 'Bạn có muốn thêm sản phẩm này không?';
      // return await this.showDialog(this.mess, event.newData);
      this.mess = 'Thiếu tên nhà cung cấp';
      return this.showToast('danger', this.mess);
    }
    //check none phoneNumber and regex
    if (event.newData.phoneNumber === '') {
      this.mess = 'Thiếu số điện thoại nhà cung cấp';
      return this.showToast('danger', this.mess);
    } else if (this.regex.test(event.newData.phoneNumber) === false) {
      this.mess = 'Số điện thoại nhà cung cấp không hợp lệ';
      return this.showToast('danger', this.mess);
    }

    //check none phoneNumber and regex
    if (event.newData.address === '') {
      this.mess = 'Thiếu địa chỉ nhà cung cấp';
      return this.showToast('danger', this.mess);
    }

    //check none phoneNumber and regex
    if (event.newData.email === '') {
      this.mess = 'Thiếu email nhà cung cấp';
      return this.showToast('danger', this.mess);
    }

    // await this.showToast(this.status, this.mess);
    // event.confirm.resolve(event.newData);

    this.mess = 'Bạn có muốn thêm nhà cung cấp này không?';
    this.method = 'post';
    this.subjects = 'nhà cung cấp';
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
    this.mess = 'Bạn có chắc chắn muốn xóa nhà cung cấp này không?';
    this.method = 'delete';
    this.subjects = 'nhà cung cấp';
    return this.showDialog(
      this.mess,
      event.data.id,
      this.method,
      this.subjects,
      event.confirm
    );
  };

  onEdit = (event: any) => {
    console.log(event.data.id);

    if (event.newData.supplierName === '') {
      this.mess = 'Thiếu tên nhà cung cấp';
      return this.showToast('danger', this.mess);
    }
    if (event.newData.phoneNumber === '') {
      this.mess = 'Thiếu số điện thoại nhà cung cấp';
      return this.showToast('danger', this.mess);
    } else if (this.regex.test(event.newData.phoneNumber) === false) {
      this.mess = 'Số điện thoại nhà cung cấp không hợp lệ';
      return this.showToast('danger', this.mess);
    }

    if (event.newData.email === '') {
      this.mess = 'Thiếu email nhà cung cấp';
      return this.showToast('danger', this.mess);
    }

    // console.log('ko trong cai gi het');

    this.mess =
      'Bạn có chắc chắn muốn thay đổi thông tin nhà cung cấp này không?';
    this.method = 'put';
    this.subjects = 'nhà cung cấp';
    return this.showDialog(
      this.mess,
      event.newData,
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
