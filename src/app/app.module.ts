import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule } from '@angular/forms';
import { RequestBase } from './services/request-base.services';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { JobsComponent } from './components/dashboard/jobs/jobs.component';
import { MapComponent } from './components/dashboard/map/map.component';
import { SessionBase } from './services/session.services';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    JobsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, HttpClientModule
  ],
  providers: [RequestBase, SessionBase],
  bootstrap: [AppComponent]
})
export class AppModule { }
