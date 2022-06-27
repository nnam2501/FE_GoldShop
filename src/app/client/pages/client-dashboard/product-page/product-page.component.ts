import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { JewerlyService } from 'src/app/services/jewerly/jewerly.service';
import { TypejewerlyService } from 'src/app/services/typejewerly/typejewerly.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  products: any = [];
  multiSelectGroupValue = [];
  typeJew: any = [];

  constructor(
    private http: HttpClient,
    private jewerly: JewerlyService,
    private cd: ChangeDetectorRef,
    private typejewerlyService: TypejewerlyService
  ) {}

  ngOnInit(): void {
    this.jewerly.getJewerly().subscribe((data) => {
      this.products = data;
      console.log(this.products);

      this.products.forEach((i: any) => {
        i.jewerlyImage = this.convertImg(i.jewerlyImage);
      });
    });

    this.typejewerlyService.getType().subscribe((data) => {
      this.typeJew = data;
    });
  }

  selectValue(value: any): void {
    this.multiSelectGroupValue = value;
    this.cd.markForCheck();

    // console.log(+value);
    this.jewerly.getJewerly().subscribe((data: any) => {
      let tmp = data;
      var dataProductTmp: any = [];
      for (let item of tmp) {
        item.typeJewerly.find((item2: any) => {
          if (item2.id === +value) {
            dataProductTmp.push(item);
          }
        });
      }
      if (dataProductTmp.length !== 0) {
        this.products = dataProductTmp;
        this.products.forEach((i: any) => {
          i.jewerlyImage = this.convertImg(i.jewerlyImage);
        });
        console.log(dataProductTmp);
      } else {
        this.products = tmp;
        this.products.forEach((i: any) => {
          i.jewerlyImage = this.convertImg(i.jewerlyImage);
        });
      }

      // tmp.filter((item: any) => {
      //   if(item.typeJewerly.find((item2:any)=>{
      //     if(item2.id === +value)
      //   }))
      // });
    });
  }

  convertImg(img: string) {
    let st: string = '/static';
    let position = 21;
    let result = [img.slice(0, position), st, img.slice(position)].join('');
    return result;
  }
}
