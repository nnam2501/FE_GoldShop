import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JewerlyService } from '../../../../../services/jewerly/jewerly.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  data: any;
  constructor(private http: HttpClient, private api: JewerlyService) {}

  ngOnInit(): void {
    this.api.getJewerly().subscribe((data) => {
      this.data = data;
    });
  }
}
