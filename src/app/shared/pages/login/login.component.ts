import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthSocialLink } from '@nebular/auth';
import { NbAuthService } from '@nebular/auth/services/auth.service';
import { NbLoginComponent } from '@nebular/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent {}
