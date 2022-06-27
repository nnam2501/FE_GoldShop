import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  NbAuthService,
  NbRegisterComponent,
  NB_AUTH_OPTIONS,
} from '@nebular/auth';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends NbRegisterComponent implements OnInit {
  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected override options: {},
    cd: ChangeDetectorRef,
    router: Router,
    private userService: UserService,
    private customerService: CustomerService
  ) {
    super(service, options, cd, router);
  }
  ngOnInit(): void {}

  reg() {
    this.user.dateOfBirth = this.convertDateTime(this.user.dateOfBirth);
    let dataAccount = {
      username: this.user.username,
      password: this.user.password,
      is_staff: false,
    };

    let dataCustomer = {
      fullName: this.user.fullName,
      dateOfBirth: this.user.dateOfBirth,
      gender: this.user.gender,
      address: this.user.address,
      phoneNumber: this.user.phoneNumber,
      idNumber: this.user.idNumber,
      account: 0,
    };

    this.userService.addNewUser(dataAccount).subscribe((res: any) => {
      dataCustomer.account = res.id;
      this.customerService.addNewCustomer(dataCustomer).subscribe((res) => {
        console.log(res);
        console.log('thanh cong');
        this.router.navigate(['/login']);
      });
    });
    console.log(this.user);
  }

  convertDateTime(datetime: string) {
    var datetimeString = formatDate(
      new Date(datetime).toLocaleString(),
      'yyyy-MM-dd',
      'en-US',
      'GMT+07:00'
    );

    var arrDatetime = datetimeString.split(' ');
    console.log(arrDatetime[0]);

    return arrDatetime[0];
  }
}
