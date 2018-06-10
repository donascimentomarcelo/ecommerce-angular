import { CredentialsDTO } from './../../models/credentials.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: CredentialsDTO = {
    email: "",
    password: ""
  };
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() 
  {
    this.formGroup = this.formBuilder.group({
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required]]
    });
  }

  login()
  {
    console.log(this.creds);
    
  }
}
