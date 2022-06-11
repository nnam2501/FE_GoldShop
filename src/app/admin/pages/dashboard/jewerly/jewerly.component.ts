import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NbGlobalLogicalPosition,
  NbToastrService,
  NbComponentStatus,
  NbDialogService,
} from '@nebular/theme';

import { TypejewerlyService } from '../../../../services/typejewerly/typejewerly.service';
import { SupplierService } from '../../../../services/supplier/supplier.service';
import { JewerlyService } from '../../../../services/jewerly/jewerly.service';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { SelectComponent } from '../../../components/select/select.component';
import { FileinputComponent } from '../../../components/fileinput/fileinput.component';

@Component({
  selector: 'app-jewerly',
  templateUrl: './jewerly.component.html',
  styleUrls: ['./jewerly.component.scss'],
})
export class JewerlyComponent implements OnInit {
  // @ViewChild(SelectComponent) ch: any;
  // arrSelected: any[] = [];

  data: any;
  dtJewerly: any[] = [];
  dtSupp: any[] = [];
  dtType: any;
  suppArr: any[] = [];
  mess: string = '';
  status: any;
  method: string = '';
  subjects: string = 'trang sức';

  settings = {
    columns: {
      jewerlyName: { title: 'Tên Trang Sức' },
      description: {
        title: 'Mô Tả',
        editor: {
          type: 'textarea',
        },
      },
      price: { title: 'Giá' },
      quantity: { title: 'Số Lượng' },
      jewerlyImage: {
        title: 'Ảnh',
        type: 'html',
        sort: false,
        filter: false,
        editor: {
          type: 'custom',
          component: FileinputComponent,
        },
        valuePrepareFunction: (picture: string) => {
          let tmp = picture;
          let st: string = '/static';
          let position = 21;
          let result = [tmp.slice(0, position), st, tmp.slice(position)].join(
            ''
          );
          return `<img width="100px" src="${result}" />`;
        },
      },
      supplier: {
        title: 'Nhà Cung Cấp',
        valuePrepareFunction: (supplier: any) => {
          return supplier.supplierName;
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [],
          },
          width: '100%',
        },
        filterFunction(supplier?: any, search?: string): boolean {
          let match = true;
          Object.keys(supplier)
            .map(() => supplier.supplierName)
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
      typeJewerly: {
        title: 'Loại Trang Sức',
        type: 'html',
        valuePrepareFunction: (type: any) => {
          let arrtmp: any = [];
          Array.isArray(type)
            ? type.find((element: any) => {
                if (element.active) arrtmp.push(element.typeName);
              })
            : undefined;
          arrtmp = arrtmp.join(', ');
          return arrtmp;
        },
        editor: {
          type: 'custom',
          component: SelectComponent,
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
  };

  constructor(
    private api: JewerlyService,
    private apiSupp: SupplierService,
    private apiType: TypejewerlyService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.api.getJewerly().subscribe((data: any) => {
      this.dtJewerly = data;
    });

    this.apiType.getType().subscribe((res) => {
      console.log(res);
      this.dtType = res;
    });

    this.apiSupp.getSupp().subscribe((res) => {
      this.data = res;
      this.dtSupp = this.data;
      for (let c of this.data) {
        this.suppArr.push({ value: c.id, title: c.supplierName });
      }
      this.getData(this.suppArr);
      console.log(this.suppArr);
    });
  }

  getData(c: any) {
    this.settings.columns.supplier.editor.config.list = [];
    // Clear role list
    var settingList: any = [];
    // Call API Hear
    // settingList.push({ value: c.id, title: c.categoryName });
    let newSettings = this.settings;
    newSettings.columns.supplier.editor.config.list = c;
    this.settings = Object.assign({}, newSettings);
  }

  onAdd = (event: any) => {
    let arrTmp = event.newData.typeJewerly;
    let arrType: any[] = [];

    for (let item in arrTmp) {
      this.dtType.find((element: any) => {
        if (element.id === arrTmp[item]) {
          arrType.push(element);
        }
      });
    }
    if (arrType.length !== 0) {
      event.newData.typeJewerly = arrType;
    }

    let data = event.newData;

    let tmp = +data.supplier;

    data.supplier = this.dtSupp.find((x) => {
      if (x.id === tmp) return x;
    });

    event.newData = data;

    this.mess = 'Bạn có muốn thêm trang sức này không?';
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
    this.mess = 'Bạn có chắc chắn muốn xóa trang sức này không?';
    this.method = 'delete';

    return this.showDialog(
      this.mess,
      event.data.id,
      this.method,
      this.subjects,
      event.confirm
    );
  };

  onEdit = (event: any) => {
    // if (event.newData.supplierName === '') {
    //   this.mess = 'Thiếu tên nhà cung cấp';
    //   return this.showToast('danger', this.mess);
    // }

    // if (event.newData.typeName === '') {
    //   this.mess = 'Thiếu tên loại trang sức';
    //   return this.showToast('danger', this.mess);
    // }
    console.log(event.newData);

    let arrTmp = event.newData.typeJewerly;
    let arrType: any[] = [];

    for (let item in arrTmp) {
      this.dtType.find((element: any) => {
        if (element.id === arrTmp[item]) {
          arrType.push(element);
        }
      });
    }
    if (arrType.length !== 0) {
      event.newData.typeJewerly = arrType;
    }

    let data = event.newData;

    let tmp = +data.supplier;
    // data.category = +data.category;
    data.supplier = this.dtSupp.find((x) => {
      if (x.id === tmp) return x;
    });

    if (event.newData.supplier === undefined) {
      event.newData.supplier = event.data.supplier;
    }
    // event.newData.jewerlyImage = '';
    // if (event.newData.jewerlyImage === '') {
    //   event.newData.jewerlyImage = event.data.jewerlyImage;
    // }

    this.mess = 'Bạn có chắc chắn muốn thay đổi thông tin trang sức này không?';
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
