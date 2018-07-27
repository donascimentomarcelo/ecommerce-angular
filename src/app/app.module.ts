import { ProfileComponent } from './pages/profile/profile.component';
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
import { SignupComponent } from './pages/signup/signup.component';
import { ZipcodeService } from './services/zipcode.service';
import {NgxMaskModule} from 'ngx-mask';
import { SignupService } from './services/domain/signup.service';
import { UserService } from './services/domain/user.service';
import { ProfileService } from './services/domain/profile.service';
import { ProfileImageComponent } from './pages/profile/profile-image/profile-image.component';
import { NgbModule } from '../../node_modules/@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CategoryComponent,
    ProductComponent,
    SignupComponent,
    ProfileComponent,
    ProfileImageComponent,
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
    NgxMaskModule.forRoot(),
    NgbModule.forRoot(),
  ],
  providers: [
    AuthService,
    StorageService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    RefreshTokenProvider,
    ProductService,
    ZipcodeService,
    SignupService,
    UserService,
    ProfileService
  ],
  bootstrap: [AppComponent],
  exports: [ProfileImageComponent],
  entryComponents: [ProfileImageComponent],
})
export class AppModule { }
