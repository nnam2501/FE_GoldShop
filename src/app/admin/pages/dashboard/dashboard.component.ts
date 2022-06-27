import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  infoEmployee: any;
  items: NbMenuItem[] = [
    {
      title: 'Trang chủ',
      icon: 'home-outline',
      link: '/dashboard',
    },
    {
      title: 'Khách Hàng',
      icon: 'person-outline',
      link: '/dashboard/customer',
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
      ],
    },
  ];
  constructor(
    private sidebarService: NbSidebarService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.userService
      .getCurrentUser(localStorage.getItem('access_token'))
      .subscribe((res: any) => {
        console.log(res);
        this.employeeService.getAllEmployee().subscribe((res1: any) => {
          this.infoEmployee = res1.filter((item: any) => {
            if (item.account.id === res.id) {
              return item;
            }
          });
          console.log(this.infoEmployee);
        });
      });
  }

  toggle() {
    this.sidebarService.toggle(true, 'left-sidebar');
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_staff');
    this.route.navigate(['/']);
  }
}
