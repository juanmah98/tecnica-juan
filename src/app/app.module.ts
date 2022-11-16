import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './component/layout/layout.module';
import { GeneralComponent } from './general/general.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
