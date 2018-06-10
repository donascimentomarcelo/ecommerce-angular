import { CredentialsDTO } from './../../models/credentials.dto';
import { Component, OnInit } from '@angular/core';

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

  constructor() { }
  
  ngOnInit() {
  }

  login()
  {
    console.log(this.creds);
    
  }
}
