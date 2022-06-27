import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  token: any;
  idAcc: any;
  is_staff: boolean = false;
  infoUser: any;
  constructor(
    private cartService: CartService,
    private userService: UserService,
    private customerService: CustomerService,
    private route: Router
  ) {}

  ngOnInit() {
    // if (localStorage.getItem('access_token')) {
    //   this.userService.getCurrentUser().subscribe((res: any) => {
    //     console.log(res);
    //   });
    // }
  }
  itemCount() {
    return this.cartService.itemCount();
  }
  checkNavigate() {
    let is_staff = localStorage.getItem('is_staff');
    if (localStorage.getItem('access_token') !== null) {
      if (is_staff === 'true') {
        this.route.navigate(['/dashboard']);
      } else this.route.navigate(['/user-info']);
    } else this.route.navigateByUrl('/login');
  }
}
