import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  formGroup: FormGroup;

  ngOnInit() 
  {

  };

  back()
  {
    this.router.navigate(['login']);
  };

}
