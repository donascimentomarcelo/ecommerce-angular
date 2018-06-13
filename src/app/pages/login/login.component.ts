import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private appComponent: AppComponent) 
    { 
      let localUser = this.storageService.getLocalUser();

      if(localUser)
      {
        this.router.navigate(['home']);
      }
    }
  
  ngOnInit() 
  {
    this.formGroup = this.formBuilder.group({
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required]]
    });
  }

  login()
  {
    this.authService.login(this.formGroup.value)
      .subscribe(response => {
        this.authService.successfulLogin(response);
        this.router.navigate(['home']);
        this.appComponent.logged = true;
      }, error =>{ });
  };
}
