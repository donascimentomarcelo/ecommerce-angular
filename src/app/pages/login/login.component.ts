import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
  
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
      }, error =>{
        console.log(error);
      })
  }
}
