import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbAuthService,
  NbLoginComponent,
  NB_AUTH_OPTIONS,
} from '@nebular/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NbAuthService],
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  token = '';
  result: any[] = [];
  client: any;
  // status: boolean = true;
  // status2: boolean = false;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected override options: {},
    cd: ChangeDetectorRef,
    router: Router
  ) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/oauth2-info/').subscribe((data) => {
      this.client = data;
    });
  }

  onFormSubmit(user: any) {
    // user.client_id = this.client.client_id;
    // user.client_secret = this.client.client_secret;
    // user.grant_type = this.client.grant_type;

    // this.userService.login(user).subscribe((res) => {
    //   console.log(res);
    // });

    this.authService.login(user, this.client).subscribe((res) => {
      this.token = res.access_token;
      localStorage.setItem('access_token', res.access_token);
      if (res.access_token !== null) {
        this.userService
          .getCurrentUser(res.access_token)
          .subscribe((res1: any) => {
            if (res1.is_staff === true) {
              localStorage.setItem('is_staff', 'true');
              this.router.navigate(['/dashboard']);
            } else {
              localStorage.setItem('is_staff', 'false');
              this.router.navigate(['/']);
            }
          });
      }
    });
    // this.http.get('http://localhost:8000/oauth2-info/').subscribe((data) => {
    //   this.client = data;
    //   console.log(this.client);
    //   this.loginForm.value.client_id = this.client.client_id;
    //   this.loginForm.value.client_secret = this.client.client_secret;
    //   this.loginForm.value.grant_type = this.client.grant_type;
    //   console.log(this.loginForm.value);
    //   this.http
    //     .post('http://localhost:8000/o/token/', this.loginForm.value)
    //     .subscribe((data) => {
    //       console.log(this.loginForm.value);
    //       // this.isLoadingResults = false;
    //       // this.router.navigate(['/login']).then((_) => console.log('navigated'));
    //     });
    // });
  }
}
