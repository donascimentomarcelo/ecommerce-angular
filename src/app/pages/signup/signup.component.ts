import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZipcodeService } from '../../services/zipcode.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private zipcodeService: ZipcodeService,
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
    this.zipcodeService.getZipcodeAPI(this.zipcode)
      .subscribe(response => {
        console.log(response)
      }, error => {
        console.log(error)
      })
  }

  login()
  {
    console.log(this.formGroup.value)
  };

}
