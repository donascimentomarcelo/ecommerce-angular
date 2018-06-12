import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './pages/category/category/category.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    StorageService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
