import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoives/invoices.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  dtInvoice: any = [];

  settings = {
    columns: {
      id: { title: 'Mã hóa đơn', editable: false },
      invoiceDate: { title: 'Ngày tạo', editable: false },
      employee: {
        title: 'Người tạo',
      },
      order: {
        title: 'Mã đơn đặt hàng',
      },
      total: {
        title: 'Tổng tiền',
      },
      // active: {
      //   title: 'Trạng thái',
      // },
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
          name: 'print',
          title: '<i class="far fa-edit"></i>',
        },
      ],
    },
  };

  constructor(private invoiceService: InvoicesService) {}

  ngOnInit(): void {
    this.invoiceService.getAllInvoice().subscribe((res) => {
      this.dtInvoice = res;
    });
  }

  onCustom(event: any) {
    console.log(event);
  }
}
