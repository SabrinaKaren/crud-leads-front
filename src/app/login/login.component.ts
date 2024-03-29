import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  showLoginFields = true;
  showRegisterFields = false;

  login = {
    userName: '',
    password: ''
  };

  newUser = {
    userName: '',
    password: ''
  }

  constructor(private router: Router, private loginService: LoginService, private notifier: NotifierService) { }

  ngOnInit() {
    window.localStorage["token"] = '';
    window.localStorage["tokenExpiration"] = '';
  }

  toLogin() {

    if(this.login && (this.login.userName != '' || this.login.password != '')) {
      this.loading = true;
      this.login.userName = this.login.userName.replace('.','').replace('-','');
      this.loginService.toLogin(this.login).subscribe(res => {
        if(res.result == 'SUCCESS'){
          window.localStorage["token"] = res.msgSaida[0].token;
          window.localStorage["tokenExpiration"] = res.msgSaida[0].expirationDate;
          this.router.navigate(['/home']);
        } else {
          window.localStorage["token"] = '';
          window.localStorage["tokenExpiration"] = '';
          this.notifier.notify('error', res.error[0].message);
        }
        this.loading = false;
      }, error => {
        this.loading = false;
        this.notifier.notify('error', error.message);
      });
    }
    
  }

  register() {

    if (this.newUser.userName == undefined || this.newUser.userName == ''
        || this.newUser.password == undefined || this.newUser.password == ''){
      this.notifier.notify('error', 'Favor escolher usuário e senha..');
      return;
    }

    this.loading = true;
    this.loginService.register(this.newUser).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.notifier.notify('success', res.msgSaida[0]);
        this.startPage();
      } else {
        this.notifier.notify('error', res.error[0].message);
      }
      this.loading = false;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.notifier.notify('error', error.message);
      }
      this.loading = false;
    });
    
  }

  goToRegisterFields = function () {
    this.showLoginFields = false;
    this.showRegisterFields = true;
  }

  startPage() {
    this.showLoginFields = true;
    this.showRegisterFields = false;
    this.login = {
      userName: '',
      password: ''
    };
    this.newUser = {
      userName: '',
      password: ''
    }
  }

}