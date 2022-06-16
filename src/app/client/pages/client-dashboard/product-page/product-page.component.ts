import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JewerlyService } from 'src/app/services/jewerly/jewerly.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  products: any = [];

  constructor(private http: HttpClient, private jewerly: JewerlyService) {}

  ngOnInit(): void {
    this.jewerly.getJewerly().subscribe((data) => {
      this.products = data;
      this.products.forEach((i: any) => {
        i.jewerlyImage = this.convertImg(i.jewerlyImage);
      });
      // console.log(this.products);
    });
  }

  convertImg(img: string) {
    let st: string = '/static';
    let position = 21;
    let result = [img.slice(0, position), st, img.slice(position)].join('');
    return result;
  }
}
