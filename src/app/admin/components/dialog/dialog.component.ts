import { Component, OnInit } from '@angular/core';
import {
  NbDialogRef,
  NbComponentStatus,
  NbToastrService,
  NbGlobalLogicalPosition,
} from '@nebular/theme';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { CategoryService } from '../../../services/category/category.service';
import { TypejewerlyService } from '../../../services/typejewerly/typejewerly.service';
import { JewerlyService } from '../../../services/jewerly/jewerly.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  data: any;
  content: string = '';
  method: string = '';
  subjects: string = '';
  confirm: any;

  mess: string = '';

  constructor(
    protected dialogRef: NbDialogRef<DialogComponent>,
    private toastrService: NbToastrService,
    private apiSupp: SupplierService,
    private apiCate: CategoryService,
    private apiType: TypejewerlyService,
    private apiJew: JewerlyService,
    private apiCust: CustomerService
  ) {}

  ngOnInit(): void {}

  async cancel() {
    await this.dialogRef.close();
  }
  async submit() {
    if (this.subjects === 'nhà cung cấp') {
      this.onChange(this.method, this.subjects, this.confirm);
    }
    if (this.subjects === 'danh mục') {
      this.onChange(this.method, this.subjects, this.confirm);
    }
    if (this.subjects === 'loại trang sức') {
      this.onChange(this.method, this.subjects, this.confirm);
    }
    if (this.subjects === 'trang sức') {
      this.onChange(this.method, this.subjects, this.confirm);
    }
    if (this.subjects === 'khách hàng') {
      this.onChange(this.method, this.subjects, this.confirm);
    }
  }

  onChange = async (method: string, text: string, confirm: any) => {
    switch (method) {
      case 'post': {
        this.dialogRef.close();
        await this.onAdd(text, confirm);
        this.showToast('success', `Thêm ${text} thành công`);
        break;
      }
      case 'put': {
        this.dialogRef.close();
        await this.onEdit(text, confirm);
        this.showToast('success', `Chỉnh sửa ${text} thành công`);
        break;
      }
      case 'delete': {
        this.dialogRef.close();
        await this.onDelete(text, confirm);
        this.showToast('success', `Xóa ${text} thành công`);
        break;
      }
    }
  };

  onAdd = async (text: string, confirm: any) => {
    if (text === 'nhà cung cấp') {
      await this.apiSupp.postSupp(this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
    if (text === 'danh mục') {
      await this.apiCate.postCate(this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
    if (text === 'loại trang sức') {
      await this.apiType.postType(this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
    if (text === 'trang sức') {
      await this.apiJew.postJewerly(this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
  };

  onDelete = async (text: string, confirm: any) => {
    if (text === 'nhà cung cấp') {
      await this.apiSupp.delTmpSupp(this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
    if (text === 'danh mục') {
      await this.apiCate.delTmpCate(this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
    if (text === 'loại trang sức') {
      await this.apiType.delTmpType(this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
    if (text === 'trang sức') {
      await this.apiJew.delTmpJewerly(this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
    if (text === 'khách hàng') {
      this.apiCust.delTmpCustomer(this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
  };

  onEdit = (text: string, confirm: any) => {
    if (text === 'nhà cung cấp') {
      this.apiSupp.putSupp(this.data.id, this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
    if (text === 'danh mục') {
      this.apiCate.putCate(this.data.id, this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
    if (text === 'loại trang sức') {
      this.apiType.putType(this.data.id, this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
    if (text === 'trang sức') {
      this.apiJew.putJewerly(this.data.id, this.data).subscribe((res) => {
        console.log(res);
        confirm.resolve(res);
      });
    }
    if (text === 'khách hàng') {
      this.apiCust.putCustomer(this.data.id, this.data).subscribe((res) => {
        confirm.resolve(res);
      });
    }
  };

  showToast(status: NbComponentStatus, mess: string) {
    this.toastrService.show(status, `${mess}`, {
      status,
      limit: 3,
      position: NbGlobalLogicalPosition.BOTTOM_END,
    });
  }
}
