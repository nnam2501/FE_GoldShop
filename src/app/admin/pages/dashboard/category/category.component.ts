import { OnDestroy, Component, OnInit } from '@angular/core';
import {
  NbGlobalLogicalPosition,
  NbToastrService,
  NbComponentStatus,
  NbDialogService,
} from '@nebular/theme';
import { Subject, takeUntil } from 'rxjs';

import { CategoryService } from '../../../../services/category/category.service';
import { DialogComponent } from '../../../components/dialog/dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  data: any;
  dtCate: any[] = [];
  mess: string = '';
  status: any;
  method: string = '';
  subjects: string = '';

  isLoading: boolean = false;

  settings = {
    columns: {
      categoryName: { title: 'Tên Danh Mục' },
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
  };

  constructor(
    private api: CategoryService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.api
      .getCate()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.data = res;
        this.dtCate = this.data;
      });
  }

  onAdd = (event: any) => {
    if (event.newData.categoryName === '') {
      this.mess = 'Thiếu tên danh mục';
      return this.showToast('danger', this.mess);
    }

    this.mess = 'Bạn có muốn thêm danh mục này không?';
    this.method = 'post';
    this.subjects = 'danh mục';
    return this.showDialog(
      this.mess,
      event.newData,
      this.method,
      this.subjects,
      event.confirm
    );
  };

  onDelete = (event: any) => {
    this.mess = 'Bạn có chắc chắn muốn xóa danh mục này không?';
    this.method = 'delete';
    this.subjects = 'danh mục';
    return this.showDialog(
      this.mess,
      event.data.id,
      this.method,
      this.subjects,
      event.confirm
    );
  };

  onEdit = (event: any) => {
    if (event.newData.supplierName === '') {
      this.mess = 'Thiếu tên nhà cung cấp';
      return this.showToast('danger', this.mess);
    }

    this.mess = 'Bạn có chắc chắn muốn thay đổi thông tin danh mục này không?';
    this.method = 'put';
    this.subjects = 'danh mục';
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
      closeOnEsc: false,
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
