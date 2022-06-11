import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  items: NbMenuItem[] = [
    {
      title: 'Trang chủ',
      icon: 'home-outline',
      link: '/dashboard',
    },
    {
      title: 'Người Dùng',
      icon: 'person-outline',
      children: [
        { title: 'Nhân Viên', link: '/dashboard/employee' },
        { title: 'Khách Hàng', link: '/dashboard/customer' },
      ],
    },
    {
      title: 'Sản Phẩm',
      icon: 'person-outline',
      children: [
        { title: 'Trang Sức', link: '/dashboard/jewerly' },
        { title: 'Loại Trang Sức', link: '/dashboard/type-jewerly' },
        { title: 'Danh Mục', link: '/dashboard/category' },
        { title: 'Nhà Cung Cấp', link: '/dashboard/supplier' },
      ],
    },
    {
      title: 'Phiếu',
      icon: 'person-outline',
      children: [
        { title: 'Đặt Hàng', link: '/dashboard/order' },
        { title: 'Hóa Đơn', link: '/dashboard/invoice' },
        { title: 'Nhập Hàng', link: '/dashboard/receipt' },
      ],
    },
  ];
  constructor(
    private sidebarService: NbSidebarService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  toggle() {
    this.sidebarService.toggle(true, 'left-sidebar');
  }
  logout() {
    localStorage.removeItem('access_token');
    this.route.navigate(['/']);
  }
}
