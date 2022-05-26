import { Component, OnInit } from '@angular/core';
import {
  NbGlobalLogicalPosition,
  NbToastrService,
  NbComponentStatus,
  NbDialogService,
} from '@nebular/theme';

import { TypejewerlyService } from '../../services/typejewerly/typejewerly.service';
import { CategoryService } from '../../services/category/category.service';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { SelectComponent } from '../../components/select/select.component';

@Component({
  selector: 'app-typejewerly',
  templateUrl: './typejewerly.component.html',
  styleUrls: ['./typejewerly.component.scss'],
})
export class TypejewerlyComponent implements OnInit {
  data: any;
  dtType: any[] = [];
  apiCate: any[] = [];
  dtCate: any[] = [];
  mess: string = '';
  status: any;
  method: string = '';
  subjects: string = 'loại trang sức';

  settings = {
    columns: {
      typeName: { title: 'Tên Loại Trang Sức' },
      category: {
        title: 'Tên Danh Mục',
        valuePrepareFunction: (category: any) => {
          return category.categoryName;
        },
        // width: '100%',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [],
          },
          width: '100%',
        },
        // filter: {
        //   type: 'list',
        //   config: {
        //     selectText: 'Select',
        //     list: [],
        //   },
        // },
        filterFunction(category?: any, search?: string): boolean {
          let match = true;
          Object.keys(category)
            .map(() => category.categoryName)
            .filter((it) => {
              match = it.toLowerCase().includes(search);
            });

          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        },
      },
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
    // actions: {
    //   position: 'right',
    //   add: false,
    //   edit: false,
    //   delete: false,
    //   custom: [
    //     {
    //       name: 'detailAction',
    //       title: '<i class="fas fa-plus"></i>',
    //     },
    //     {
    //       name: 'editAction',
    //       title: '<i class="far fa-edit"></i>',
    //     },
    //     {
    //       name: 'deleteAction',
    //       title: '<i class="fas fa-trash-alt"></i>',
    //     },
    //   ],
    // },
  };

  constructor(
    private api: TypejewerlyService,
    private apiTmp: CategoryService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.api.getType().subscribe((res) => {
      this.data = res;
      this.dtType = this.data;

      // console.log(this.dtType);
    });

    this.apiTmp.getCate().subscribe((res) => {
      this.data = res;
      this.dtCate = this.data;
      // console.log(this.dtCate);
      for (let c of this.dtCate) {
        this.apiCate.push({ value: c.id, title: c.categoryName });
      }
      this.getData(this.apiCate);
    });
  }
  getData(c: any) {
    this.settings.columns.category.editor.config.list = [];
    // Clear role list
    var settingList: any = [];
    // Call API Hear
    // settingList.push({ value: c.id, title: c.categoryName });
    let newSettings = this.settings;
    newSettings.columns.category.editor.config.list = c;
    this.settings = Object.assign({}, newSettings);
  }

  onAdd = (event: any) => {
    // console.log(event);

    if (event.newData.typeName === '') {
      this.mess = 'Thiếu tên loại trang sức';
      return this.showToast('danger', this.mess);
    }
    if (event.newData.categoryName === '') {
      this.mess = 'Thiếu tên danh mục';
      return this.showToast('danger', this.mess);
    }

    let data = event.newData;

    let tmp = +data.category;
    // data.category = +data.category;
    data.category = this.dtCate.find((x) => {
      if (x.id === tmp) return x;
    });

    event.newData = data;

    this.mess = 'Bạn có muốn thêm loại trang sức này không?';
    this.method = 'post';

    return this.showDialog(
      this.mess,
      event.newData,
      this.method,
      this.subjects,
      event.confirm
    );
  };

  onDelete = (event: any) => {
    this.mess = 'Bạn có chắc chắn muốn xóa loại trang sức này không?';
    this.method = 'delete';

    console.log(event.data.id);

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

    if (event.newData.typeName === '') {
      this.mess = 'Thiếu tên loại trang sức';
      return this.showToast('danger', this.mess);
    }

    let data = event.newData;

    let tmp = +data.category;
    // data.category = +data.category;
    data.category = this.dtCate.find((x) => {
      if (x.id === tmp) return x;
    });

    if (event.newData.category === undefined) {
      event.newData.category = event.data.category;
    }

    this.mess =
      'Bạn có chắc chắn muốn thay đổi thông tin loại trang sức này không?';
    this.method = 'put';

    console.log(event);

    return this.showDialog(
      this.mess,
      event.newData,
      this.method,
      this.subjects,
      event.confirm
    );
  };

  // onCustom(event: any) {
  //   switch (event.action) {
  //     case 'detailAction': {
  //       console.log('detailAction');
  //       break;
  //     }
  //     case 'editAction': {
  //       console.log('edtiAction');
  //       break;
  //     }
  //     case 'deleteAction': {
  //       console.log('deleteAction');
  //       break;
  //     }
  //   }
  //   console.log(event);
  // }

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
