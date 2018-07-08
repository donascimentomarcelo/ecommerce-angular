import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  formGroup: FormGroup;
  zipcode: string;

  ngOnInit() 
  {
    this.initForm();
  };

  initForm()
  {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
    });
  };

  back()
  {
    this.router.navigate(['login']);
  };

  getZipcode()
  {
    console.log(this.zipcode)
  }

  login()
  {
    console.log(this.formGroup.value)
  };

}
