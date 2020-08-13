import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LeadComponent } from './lead/lead.component';
import { StatusComponent } from './status/status.component';
import { UserComponent } from './user/user.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { LoginComponent } from './login/login.component';

import { CanActivateLoginService } from './services/can-activate-login.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: MainLayoutComponent, children: [
    { path: 'home', component: HomeComponent, canActivate: [CanActivateLoginService] },
    { path: 'lead', component: LeadComponent, canActivate: [CanActivateLoginService] },
    { path: 'status', component: StatusComponent, canActivate: [CanActivateLoginService] },
    { path: 'user', component: UserComponent, canActivate: [CanActivateLoginService] },
    { path: 'opportunity', component: OpportunityComponent, canActivate: [CanActivateLoginService] }
  ]},
  { path: 'login', component: LoginComponent }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
