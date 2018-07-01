import { PipeModule } from './pipe/Pipe.module';
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
import { RefreshTokenProvider } from './interceptors/refreshToken.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductComponent } from './pages/product/product.component';
import { ProductService } from './services/domain/product.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CategoryComponent,
    ProductComponent,
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
    NgxPaginationModule,
    PipeModule,
  ],
  providers: [
    AuthService,
    StorageService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    RefreshTokenProvider,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
