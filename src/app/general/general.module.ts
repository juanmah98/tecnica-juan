import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  exports: [
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    RouterModule
  ]
})
export class GeneralModule { }
