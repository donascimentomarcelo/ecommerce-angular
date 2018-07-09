import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZipcodeService } from '../../services/zipcode.service';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../services/state.service';
import { StateDTO } from '../../models/state.dto';

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
    private toastrService: ToastrService,
    private stateService: StateService,
  ) { }

  formGroup: FormGroup;
  zipcode: string;
  states: StateDTO[] = [];

  ngOnInit() 
  {
    this.initForm();
    this.getState();
  };

  initForm()
  {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(80)]],
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(80)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(80)]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipcode: [null, [Validators.required]],
    }, {validator: this.matchingPasswords('password', 'password_confirmation')});
  };

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        this.formGroup.controls.password_confirmation.setErrors({"notEqual": true})
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  back()
  {
    this.router.navigate(['login']);
  };

  getZipcode()
  {
    if(this.zipcode == null)
    {
      return;
    };
    this.zipcodeService.getZipcodeAPI(this.zipcode)
      .subscribe(response => {
        if(response['erro'] !== true)
        {
          this.formGroup.controls.address.setValue(response.logradouro +' - '+ response.bairro);
          this.formGroup.controls.city.setValue(response.localidade);
          this.formGroup.controls.state.setValue(response.uf);
          this.formGroup.controls.zipcode.setValue(response.cep);
        }
        else
        {
          this.toastrService.error('O CEP '+ this.zipcode +' não foi encontrado ', 'CEP inválido', {
            timeOut: 3000,
          });
        };
      }, error => {
        this.formGroup.controls.address.setValue(null);
        this.formGroup.controls.city.setValue(null);
        this.formGroup.controls.state.setValue(null);
        this.formGroup.controls.zipcode.setValue(null);
        this.toastrService.error('', 'O CEP não foi encontrado', {
          timeOut: 3000,
        });
      });
  };

  login()
  {
    console.log(this.formGroup.value)
  };

  getState()
  {
    this.stateService.getStateAPI()
      .subscribe(response => {
        this.states = response;
      }, error => {

      });
  };
}
