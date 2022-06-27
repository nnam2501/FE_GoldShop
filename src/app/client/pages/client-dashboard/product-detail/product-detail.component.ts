import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JewerlyService } from 'src/app/services/jewerly/jewerly.service';
import { CartService } from 'src/app/services/cart/cart.service';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbToastrService,
} from '@nebular/theme';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private jewerly: JewerlyService,
    private cartService: CartService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    this.jewerly.getJewerlyById(productIdFromRoute).subscribe((data) => {
      this.product = data;
      this.product.jewerlyImage = this.convertImg(this.product.jewerlyImage);
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.showToast(
      'success',
      `${product.jewerlyName} đã được thêm vào giỏ hàng.`
    );
  }

  convertImg(img: string) {
    let st: string = '/static';
    let position = 21;
    let result = [img.slice(0, position), st, img.slice(position)].join('');
    return result;
  }
  showToast(status: NbComponentStatus, mess: string) {
    this.toastrService.show(status, `${mess}`, {
      status,
      limit: 3,
      position: NbGlobalLogicalPosition.BOTTOM_END,
    });
  }
}
