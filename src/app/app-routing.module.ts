import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoryComponent } from './pages/category/category/category.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    [ RouterModule.forRoot(routes) ]
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
