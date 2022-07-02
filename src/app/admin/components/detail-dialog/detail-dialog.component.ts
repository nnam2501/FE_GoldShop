import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NbComponentStatus,
  NbDialogRef,
  NbDialogService,
  NbGlobalLogicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { InvoicesService } from 'src/app/services/invoives/invoices.service';
import { JewerlyService } from 'src/app/services/jewerly/jewerly.service';
import { OrderDetailService } from 'src/app/services/order-detail/order-detail.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss'],
})
export class DetailDialogComponent implements OnInit {
  dtOrderDetail: any[] = [];
  id: any;
  dtJewerly: any = [];
  status: boolean = false;
  total: any = 0;
  dtInvoice: any = [];

  head = [['NO.', 'Ten San Pham', 'So Luong', 'Don Gia', 'Thanh Tien']];

  constructor(
    private orderDetailService: OrderDetailService,
    private route: ActivatedRoute,
    private jewerlyService: JewerlyService,
    private orderService: OrderService,
    private toastrService: NbToastrService,
    private invoiceService: InvoicesService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.orderDetailService.getAllOrderDetail().subscribe((res: any) => {
      res.forEach((item: any) => {
        if (item.order === Number(this.id)) {
          this.dtOrderDetail.push(item);
          this.total += item.amount;
        }
      });
    });

    this.jewerlyService.getJewerly().subscribe((res) => {
      this.dtJewerly = res;
    });

    this.orderService.getOrderById(this.id).subscribe((res: any) => {
      this.status = res.active;
    });

    this.invoiceService.getAllInvoice().subscribe((res) => {
      this.dtInvoice = res;
    });
  }

  submit() {
    this.orderService.delTmpOrder(this.id).subscribe(() => {
      this.showToast('success', 'Cập nhật thành công');
    });
  }

  showToast(status: NbComponentStatus, mess: string) {
    this.toastrService.show(status, `${mess}`, {
      status,
      limit: 3,
      position: NbGlobalLogicalPosition.BOTTOM_END,
    });
  }

  createInvoice() {
    // this.invoiceService.addNewInvoice()
  }

  // createPdf() {
  //   var doc = new jsPDF();
  //   var data: any = this.convertData(this.dtOrderDetail);

  //   const myFont =
  //     'src/assets/fonts/Proxima/Fontspring-DEMO-proximanova-regular.otf';

  //   // add the font to jsPDF
  //   doc.addFileToVFS('MyFont.otf', myFont);
  //   doc.addFont('MyFont.otf', 'MyFont', 'normal');
  //   doc.setFont('MyFont');

  //   // doc.setFontSize(18);
  //   // doc.text(`Hoa don`, 11, 8);
  //   // doc.setFontSize(11);
  //   // doc.setTextColor(100);
  //   (doc as any).autoTable({
  //     head: [['']],
  //     body: data,
  //     theme: 'plain',
  //     didDrawCell: (data: any) => {
  //       console.log(data.column.index);
  //     },
  //   });

  //   doc.setFontSize(18);
  //   doc.text(`Thong tin don hang ${this.id}`, 11, 8);
  //   doc.setFontSize(11);
  //   doc.setTextColor(100);
  //   (doc as any).autoTable({
  //     head: this.head,
  //     body: data,
  //     theme: 'plain',
  //     didDrawCell: (data: any) => {
  //       console.log(data.column.index);
  //     },
  //   });

  //   // below line for Open PDF document in new tab
  //   doc.output('dataurlnewwindow');

  //   // below line for Download PDF document
  //   doc.save('Invoice.pdf');
  // }

  convertData(data: any) {
    var dt: any = [];
    let orderTmp = this.dtOrderDetail;
    let jewTmp = this.dtJewerly;
    orderTmp.forEach((item) => {
      jewTmp.forEach((item2: any) => {
        if (item2.id === item.jewerly) {
          item.jewerly = item2.jewerlyName;
          dt.push(Object.values(item));
        }
      });
    });
    console.log(dt);

    return dt;
  }
  // submit(dialog: TemplateRef<any>) {
  //   this.dialogService.open(dialog, {
  //     context: 'this is some additional data passed to dialog',
  //   });
  // }

  // showDialog(
  //   content: any,
  //   data: any,
  //   method: string,
  //   subjects: string,
  //   confirms: any
  // ) {
  //   this.dialogService.open(DialogComponent, {
  //     closeOnBackdropClick: false,
  //     context: {
  //       content: content,
  //       data: data,
  //       method: method,
  //       subjects: subjects,
  //       confirm: confirms,
  //     },
  //   });
  // }
}
