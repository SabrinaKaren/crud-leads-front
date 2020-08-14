import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateLoginService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.checkLogin();
  }

  checkLogin(){

    if (window.localStorage["token"] != undefined && window.localStorage["token"] != '' &&
        window.localStorage["tokenExpiration"] != undefined && window.localStorage["tokenExpiration"] != ''){
      
      if (new Date() < new Date(window.localStorage["tokenExpiration"])){
        return true;
      }
          
    }

    this.router.navigate(['/login']);
    return false;

  }

}