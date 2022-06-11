import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthSocialLink } from '@nebular/auth';
import { NbAuthService } from '@nebular/auth/services/auth.service';
import { NbLoginComponent } from '@nebular/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  username: string = '';
  password: string = '';
  token = '';
  result: any[] = [];
  client: any;
  // status: boolean = true;
  // status2: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    public formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.http.get('http://localhost:8000/oauth2-info/').subscribe((data) => {
      this.client = data;
    });
  }

  onFormSubmit() {
    this.authService
      .login(this.loginForm.value, this.client)
      .subscribe((res) => {
        this.token = res.access_token;
        localStorage.setItem('access_token', res.access_token);
        if (this.token) {
          this.router.navigate(['/dashboard']);
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
