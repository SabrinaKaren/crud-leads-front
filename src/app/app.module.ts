import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MatNativeDateModule } from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatToolbarModule, MatIconModule, MatSidenavModule } from '@angular/material';
//import { MaterialModule } from './material.module';
import { NotifierModule } from 'angular-notifier';
//import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LeadComponent } from './lead/lead.component';
import { StatusComponent } from './status/status.component';
import { UserComponent } from './user/user.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeadComponent,
    StatusComponent,
    UserComponent,
    OpportunityComponent,
    LoadingComponent,
    LoginComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig({
      position: { horizontal: { position: 'right', distance: 12 } },
      behaviour: { autoHide: 5000 }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
